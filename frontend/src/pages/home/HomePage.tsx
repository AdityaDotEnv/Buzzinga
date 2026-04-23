import { useEffect, useState, type FormEvent } from 'react'
import '../../App.css'
import { taglines } from './content'
import { Footer } from './sections/Footer'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { MobileDrawer } from './sections/MobileDrawer'
import { Navbar } from './sections/Navbar'
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

    handleLaunch(`Joining room ${cleanCode}`)
  }

  return (
    <div className="app-shell">
      <div className="app-background" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="grid" />
      </div>

      <Navbar mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((value) => !value)} onLaunch={handleLaunch} />
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLaunch={handleLaunch} />

      <main id="home">
        <HeroSection
          tagline={taglines[taglineIndex]}
          gameCode={gameCode}
          onGameCodeChange={setGameCode}
          onJoin={handleJoin}
          onLaunch={handleLaunch}
        />
        <SocialProofSection />
        <FeaturesSection />
        <TimelineSection />
        <ExploreSection />
        <CtaSection onLaunch={handleLaunch} />
      </main>

      <Footer />
      <NoticeBar notice={notice} />
    </div>
  )
}

export default HomePage
