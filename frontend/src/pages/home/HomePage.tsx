import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import styles from './HomePage.module.css'
import { taglines } from './content'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { NoticeBar } from './sections/NoticeBar'
import { ExploreSection } from './sections/ExploreSection'
import { SocialProofSection } from './sections/SocialProofSection'
import { TimelineSection } from './sections/TimelineSection'
import { CtaSection } from './sections/CtaSection'

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [gameCode, setGameCode] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTaglineIndex((current) => (current + 1) % taglines.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => setNotice(null), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const handleLaunch = (message: string) => {
    setNotice(message)
    setMobileMenuOpen(false)
  }

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanCode = gameCode.trim().toUpperCase()
    if (!cleanCode) {
      setNotice('Enter a game code to join')
      return
    }

    navigate('/join', { state: { pin: cleanCode } })
  }

return (
    <div className={styles.appShell}>
      <div className={styles.appBackground} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.grid} />
      </div>

      <Navbar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((value) => !value)} onLaunch={handleLaunch} />

      <main id="home">
        <HeroSection
          tagline={taglines[taglineIndex]}
          gameCode={gameCode}
          onGameCodeChange={setGameCode}
          onJoin={handleJoin}
          onLaunch={handleLaunch}
          onOpenCreateQuiz={() => navigate('/create-quiz')}
        />
        <SocialProofSection />
        <FeaturesSection />
        <TimelineSection />
        <ExploreSection />
        <CtaSection onLaunch={handleLaunch} onOpenCreateQuiz={() => navigate('/create-quiz')} />
      </main>

      <Footer />
      <NoticeBar notice={notice} />
    </div>
  )
}

export default HomePage
