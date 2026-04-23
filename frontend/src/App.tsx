import { useEffect, useState } from 'react'
import HomePage from './pages/home/HomePage'
import { CreateQuizPage } from './pages/create-quiz/CreateQuizPage'
import { JoinQuizPage } from './pages/join-quiz/JoinQuizPage'

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath: string) => {
    if (nextPath === window.location.pathname) return

    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }

  if (pathname === '/create-quiz') {
    return <CreateQuizPage onGoHome={() => navigate('/')} />
  }

  if (pathname === '/join-quiz') {
    return <JoinQuizPage />
  }

  return <HomePage onCreateQuiz={() => navigate('/create-quiz')} />
}
