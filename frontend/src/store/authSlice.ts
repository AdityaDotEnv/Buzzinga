import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  hostSecret: string | null;
  role: 'host' | 'player' | 'admin' | null;
}

const initialState: AuthState = {
  hostSecret: localStorage.getItem('hostSecret'),
  role: (localStorage.getItem('role') as AuthState['role']) || null,
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
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
