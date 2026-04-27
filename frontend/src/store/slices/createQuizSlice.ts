import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CreationMode } from '../../pages/create-quiz/types';

interface CreateQuizState {
  selectedMode: CreationMode['id'];
  quizTitle: string;
  quizDescription: string;
}

const initialState: CreateQuizState = {
  selectedMode: 'scratch',
  quizTitle: '',
  quizDescription: '',
};

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState,
  reducers: {
    setSelectedMode: (state, action: PayloadAction<CreationMode['id']>) => {
      state.selectedMode = action.payload;
    },
    setQuizTitle: (state, action: PayloadAction<string>) => {
      state.quizTitle = action.payload;
    },
    setQuizDescription: (state, action: PayloadAction<string>) => {
      state.quizDescription = action.payload;
    },
  },
});

export const { setSelectedMode, setQuizTitle, setQuizDescription } = createQuizSlice.actions;

export default createQuizSlice.reducer;
