import { Server, Socket } from 'socket.io';
import Quiz from '../models/quizModel';
import Room from '../models/roomModel';
import User from '../models/User';

interface GameState {
  roomCode: string;
  quizId: string;
  quizTitle: string;
  questions: any[];
  currentQuestionIndex: number;
  phase: 'waiting' | 'countdown' | 'question' | 'locked' | 'result' | 'ended';
  players: { nickname: string; score: number; socketId: string; userId?: string }[];
  timer: number;
  autoStartTimer?: NodeJS.Timeout;
  gameLoopTimer?: NodeJS.Timeout;
  timeLimit: number;
}

class GameManager {
  private rooms: Map<string, GameState> = new Map();
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public init() {
    this.io.on('connection', (socket: Socket) => {
      socket.on('join-room', ({ roomCode, nickname, userId }) => this.handleJoinRoom(socket, roomCode, nickname, userId));
      socket.on('submit-answer', ({ roomCode, answerIndex }) => this.handleSubmitAnswer(socket, roomCode, answerIndex));
      socket.on('host-start', ({ roomCode }) => this.handleHostStart(socket, roomCode));
      socket.on('disconnect', () => this.handleDisconnect(socket));
    });
  }

  private async handleJoinRoom(socket: Socket, roomCode: string, nickname: string, userId?: string) {
    let state = this.rooms.get(roomCode);

    if (!state) {
      // Fetch room and quiz from DB
      const room = await Room.findOne({ roomCode });
      if (!room) return socket.emit('error', 'Room not found');

      const quiz = await Quiz.findById(room.quizId).lean();
      if (!quiz) return socket.emit('error', 'Quiz not found');

      console.log(`Room ${roomCode} initialized with quiz: ${quiz.title} (${quiz.questions.length} questions)`);
      if (quiz.questions.length > 0) {
        console.log(`First question: ${quiz.questions[0].text}`);
      }

      state = {
        roomCode,
        quizId: room.quizId.toString(),
        quizTitle: (quiz as any).title || 'Untitled Quiz',
        questions: quiz.questions,
        currentQuestionIndex: 0,
        phase: 'waiting',
        players: [],
        timer: 10,
        timeLimit: quiz.timeLimit || 15
      };
      this.rooms.set(roomCode, state);
    }

    // Check if player already exists (reconnection or duplicate event)
    const existingPlayer = state.players.find(p => p.nickname === nickname);
    if (existingPlayer) {
      existingPlayer.socketId = socket.id;
      existingPlayer.userId = userId;
      console.log(`Player ${nickname} reconnected to room ${roomCode}`);
    } else {
      state.players.push({ nickname, score: 0, socketId: socket.id, userId });
      console.log(`Player ${nickname} joined room ${roomCode}`);
    }
    socket.join(roomCode);
    this.broadcastState(roomCode);
  }

  private startCountdown(state: GameState) {
    state.phase = 'countdown';
    state.timer = 10;

    state.autoStartTimer = setInterval(() => {
      state.timer--;
      if (state.timer <= 0) {
        clearInterval(state.autoStartTimer);
        this.startQuiz(state);
      } else {
        this.broadcastState(state.roomCode);
      }
    }, 1000);
  }

  private async startQuiz(state: GameState) {
    state.phase = 'question';
    state.currentQuestionIndex = 0;
    state.timer = state.timeLimit;
    
    // Update room status in DB
    await Room.findOneAndUpdate({ roomCode: state.roomCode }, { status: 'active' });

    this.startGameLoop(state);
  }

  private startGameLoop(state: GameState) {
    this.broadcastState(state.roomCode);

    state.gameLoopTimer = setInterval(async () => {
      state.timer--;

      if (state.timer <= 0) {
        if (state.phase === 'question') {
          state.phase = 'result';
          state.timer = 5; // 5s to show result
        } else if (state.phase === 'result') {
          if (state.currentQuestionIndex < state.questions.length - 1) {
            state.currentQuestionIndex++;
            state.phase = 'question';
            state.timer = state.timeLimit;
          } else {
            state.phase = 'ended';
            clearInterval(state.gameLoopTimer);
            await Room.findOneAndUpdate({ roomCode: state.roomCode }, { status: 'ended' });
            // Persist scores to User accounts for logged-in players
            await this.flushScoresToDB(state);
          }
        }
      }
      this.broadcastState(state.roomCode);
    }, 1000);
  }

  private handleSubmitAnswer(socket: Socket, roomCode: string, answerIndex: number) {
    const state = this.rooms.get(roomCode);
    if (!state) {
      console.warn(`Attempt to submit answer for non-existent room: ${roomCode}`);
      return;
    }
    
    if (state.phase !== 'question') {
      console.warn(`Attempt to submit answer in wrong phase: ${state.phase} for room: ${roomCode}`);
      return;
    }

    const player = state.players.find(p => p.socketId === socket.id);
    if (!player) {
      console.warn(`Player not found for socketId: ${socket.id} in room: ${roomCode}`);
      return;
    }

    console.log(`Player ${player.nickname} submitted answer ${answerIndex} for question ${state.currentQuestionIndex}`);

    const question = state.questions[state.currentQuestionIndex];
    if (answerIndex === question.correct) {
      // Calculate score based on time remaining
      player.score += Math.max(100, Math.round((state.timer / state.timeLimit) * 1000));
    }

    // Check if all players answered? Not required for auto-pilot but good for speed.
    // For now, just wait for timer.
  }

  private handleHostStart(socket: Socket, roomCode: string) {
    const state = this.rooms.get(roomCode);
    if (!state) {
      console.warn(`Host tried to start non-existent room: ${roomCode}`);
      return;
    }
    
    console.log(`Host starting room: ${roomCode}`);
    if (state.phase === 'waiting' || state.phase === 'countdown') {
      if (state.autoStartTimer) clearInterval(state.autoStartTimer);
      this.startQuiz(state);
    }
  }

  private async flushScoresToDB(state: GameState) {
    const updates = state.players
      .filter(p => p.userId)
      .map(p =>
        User.findByIdAndUpdate(p.userId, {
          $inc: { score: p.score, quizzesPlayed: 1 }
        })
      );
    await Promise.all(updates);
    console.log(`Flushed scores for ${updates.length} authenticated players in room ${state.roomCode}`);
  }

  private handleDisconnect(socket: Socket) {
    // For simplicity, we don't remove players immediately to allow reconnects
    // but in a real app we'd handle this better.
  }

  private broadcastState(roomCode: string) {
    const state = this.rooms.get(roomCode);
    if (!state) return;

    // Send full state to host, limited state to players (no correct answers)
    const playerState = {
      roomCode: state.roomCode,
      quizTitle: state.quizTitle,
      phase: state.phase,
      currentQuestionIndex: state.currentQuestionIndex,
      totalQuestions: state.questions.length,
      timer: state.timer,
      players: state.players.map(p => ({ nickname: p.nickname, score: p.score })),
      question: state.phase === 'question' || state.phase === 'result' ? {
        text: state.questions[state.currentQuestionIndex].text,
        options: state.questions[state.currentQuestionIndex].options,
        correct: state.phase === 'result' ? state.questions[state.currentQuestionIndex].correct : undefined
      } : null
    };

    this.io.to(roomCode).emit('state-update', playerState);
  }
}

export default GameManager;
