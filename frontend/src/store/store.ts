import { configureStore } from '@reduxjs/toolkit';
import createQuizReducer from './slices/createQuizSlice';

export const store = configureStore({
  reducer: {
    createQuiz: createQuizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
