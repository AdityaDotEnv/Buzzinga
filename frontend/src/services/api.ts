const API_BASE_URL = 'http://localhost:5000/api';

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

const request = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || 'Request failed');
  return body;
};

export const authApi = {
  signup: (input: { username: string; email: string; password: string }) =>
    request('/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) }) as Promise<AuthResponse>,
  login: (input: { username: string; password: string }) =>
    request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) }) as Promise<AuthResponse>,
  me: () => request('/auth/me') as Promise<{ user: AuthUser }>,
};

export const quizApi = {
  create: async (quizData: any) => {
    return request('/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData),
    });
  },
  get: async (id: string) => {
    return request(`/quizzes/${id}`);
  },
  list: async () => {
    return request('/quizzes');
  },
  update: (id: string, quizData: unknown) => request(`/quizzes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(quizData) }),
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
