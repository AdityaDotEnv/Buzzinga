const API_BASE_URL = 'http://localhost:5000/api';

export const quizApi = {
  create: async (quizData: any) => {
    const res = await fetch(`${API_BASE_URL}/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData),
    });
    return res.json();
  },
  get: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/quizzes/${id}`);
    return res.json();
  },
  list: async () => {
    const res = await fetch(`${API_BASE_URL}/quizzes`);
    return res.json();
  },
};

export const roomApi = {
  create: async (quizId: string, hostSecret: string) => {
    const res = await fetch(`${API_BASE_URL}/rooms/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, hostSecret }),
    });
    return res.json();
  },
  join: async (roomCode: string, nickname: string) => {
    const res = await fetch(`${API_BASE_URL}/rooms/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode, nickname }),
    });
    return res.json();
  },
  get: async (roomCode: string) => {
    const res = await fetch(`${API_BASE_URL}/rooms/${roomCode}`);
    return res.json();
  },
};
