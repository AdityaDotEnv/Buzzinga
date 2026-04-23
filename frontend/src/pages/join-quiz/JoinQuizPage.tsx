import { useEffect, useState } from 'react'
import '../../App.css'
import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { NoticeBar } from '../home/sections/NoticeBar'
import { JoinHero } from './sections/JoinHero'
import { JoinGuidance } from './sections/JoinGuidance'
import { JoinRooms } from './sections/JoinRooms'
import { heroMessages } from './content'

export function JoinQuizPage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [roomCode, setRoomCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroMessages.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => setNotice(null), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const handleJoinNow = () => {
    const cleanCode = roomCode.trim().toUpperCase()
    const cleanName = playerName.trim()

    if (!cleanCode) {
      setNotice('Enter a room code to join')
      return
    }

    if (!cleanName) {
      setNotice('Add a display name')
      return
    }

    setNotice(`Joining room ${cleanCode} as ${cleanName}`)
  }

  return (
    <div className="app-shell join-quiz-shell">
      <div className="app-background join-quiz-background" aria-hidden="true">
        <span className="orb orb-one join-orb-one" />
        <span className="orb orb-two join-orb-two" />
        <span className="grid" />
      </div>

      <Navbar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((value) => !value)} onLaunch={() => undefined} brandHref="/" />

      <main className="join-quiz-main">
        <JoinHero
          message={heroMessages[heroIndex]}
          roomCode={roomCode}
          playerName={playerName}
          onRoomCodeChange={setRoomCode}
          onPlayerNameChange={setPlayerName}
          onSubmit={(event) => {
            event.preventDefault()
            handleJoinNow()
          }}
        />
        <JoinGuidance />
        <JoinRooms />
      </main>

      <Footer />
      <NoticeBar notice={notice} />
    </div>
  )
}
