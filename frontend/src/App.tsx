import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { CreateQuizPage } from './pages/create-quiz/CreateQuizPage'
import { JoinQuizPage } from './pages/join-quiz/JoinQuizPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-quiz" element={<CreateQuizPage />} />
      <Route path="/join-quiz" element={<JoinQuizPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
