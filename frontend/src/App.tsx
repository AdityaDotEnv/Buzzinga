import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { CreateQuizPage } from './pages/create-quiz/CreateQuizPage'
import { JoinQuizPage } from './pages/join-quiz/JoinQuizPage'
import { ManualQuizBuilderPage } from './pages/create-manual/ManualQuizBuilderPage'
import { AIQuizGeneratorPage } from './pages/create-ai/AIQuizGeneratorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-quiz" element={<CreateQuizPage />} />
      <Route path="/create/manual" element={<ManualQuizBuilderPage />} />
      <Route path="/create/ai" element={<AIQuizGeneratorPage />} />
      <Route path="/join" element={<JoinQuizPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
