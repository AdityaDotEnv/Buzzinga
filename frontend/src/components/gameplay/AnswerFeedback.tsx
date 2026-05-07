import { AnimatePresence } from "framer-motion";
import { LockedInCard } from "../../pages/play/components/LockedInCard";
import { MomentumScreen } from "../../pages/play/components/MomentumScreen";

interface LivePlayer {
  nickname: string;
  score: number;
}

interface AnswerFeedbackProps {
  phase: "blastoff" | "question" | "locked" | "timesup" | "result";
  selected: number | null;
  selectedColor?: string;
  selectedGlow?: string;
  answerTime: number;
  totalTime: number;
  questionCorrect: boolean;
  playerScore: number;
  playerStreak: number;
  onNext: () => void;
  isLastQuestion: boolean;
  livePlayers?: LivePlayer[];
  currentNickname?: string;
}

export function AnswerFeedback({
  phase,
  selected,
  selectedColor,
  selectedGlow,
  answerTime,
  totalTime,
  questionCorrect,
  playerScore,
  playerStreak,
  onNext,
  isLastQuestion,
  livePlayers = [],
  currentNickname,
}: AnswerFeedbackProps) {
  return (
    <>
      <AnimatePresence>
        {phase === "locked" &&
          selected !== null &&
          selectedColor &&
          selectedGlow && (
            <LockedInCard
              selectedColor={selectedColor}
              selectedGlow={selectedGlow}
              answerTime={answerTime}
              totalTime={totalTime}
            />
          )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === "result" && (
          <MomentumScreen
            key="momentum-screen"
            questionCorrect={questionCorrect}
            playerScore={playerScore}
            playerStreak={playerStreak}
            onNext={onNext}
            isLastQuestion={isLastQuestion}
            livePlayers={livePlayers}
            currentNickname={currentNickname}
          />
        )}
      </AnimatePresence>
    </>
  );
}
