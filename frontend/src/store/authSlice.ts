import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
}

interface AuthState {
  hostSecret: string | null;
  role: 'host' | 'player' | 'admin' | null;
  token: string | null;
  user: AuthUser | null;
  isRestoring: boolean;
}

const initialState: AuthState = {
  hostSecret: localStorage.getItem('hostSecret'),
  role: (localStorage.getItem('role') as AuthState['role']) || null,
  token: localStorage.getItem('token'),
  user: null,
  isRestoring: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ hostSecret: string; role: AuthState['role'] }>) => {
      state.hostSecret = action.payload.hostSecret;
      state.role = action.payload.role;
      localStorage.setItem('hostSecret', action.payload.hostSecret);
      if (action.payload.role) {
        localStorage.setItem('role', action.payload.role);
      }
    },
    clearAuth: (state) => {
      state.hostSecret = null;
      state.role = null;
      localStorage.removeItem('hostSecret');
      localStorage.removeItem('role');
    },
    restoreSession: (state, action: PayloadAction<{ token: string; user: AuthUser }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isRestoring = false;
    },
    setSession: (state, action: PayloadAction<{ token: string; user: AuthUser }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isRestoring = false;
      localStorage.setItem('token', action.payload.token);
    },
    clearSession: (state) => {
      state.token = null;
      state.user = null;
      state.isRestoring = false;
      localStorage.removeItem('token');
    },
    finishRestore: (state) => {
      state.isRestoring = false;
    },
  },
});

export const { setAuth, clearAuth, restoreSession, setSession, clearSession, finishRestore } = authSlice.actions;
export default authSlice.reducer;
