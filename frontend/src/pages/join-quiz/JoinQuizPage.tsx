import { useState } from 'react'
import '../../App.css'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { JoinHero } from '../../components/join/JoinHero'
import { GamePinCard } from '../../components/join/GamePinCard'
import { RoomPreviewCard } from '../../components/join/RoomPreviewCard'
import { SuccessToast } from '../../components/join/SuccessToast'

type JoinStatus = 'idle' | 'joining' | 'error'

export function JoinQuizPage() {
  const [gamePin, setGamePin] = useState('')
  const [nickname, setNickname] = useState('')
  const [joinStatus, setJoinStatus] = useState<JoinStatus>('idle')
  const [showToast, setShowToast] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleJoin = async () => {
    if (!gamePin) {
      setJoinStatus('error')
      return
    }
    
    setJoinStatus('joining')
    // Simulate join flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (gamePin === '123456') {
      setJoinStatus('idle')
      setShowToast(true)
    } else {
      setJoinStatus('error')
    }
  }

  return (
    <div className="app-shell min-h-screen flex flex-col bg-[#1f1633] text-white">
      {showToast && (
        <SuccessToast 
          message={`Welcome, ${nickname || 'Player'}! Joining Science Trivia Night...`} 
          onClose={() => setShowToast(false)} 
        />
      )}
      <div className="app-background" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="grid" />
      </div>

      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
        brandHref="/"
        onLaunch={() => {}}
      />

      <main className="flex-grow flex flex-col items-center px-4 py-12 md:py-20 max-w-[1152px] mx-auto w-full gap-16 md:gap-24">
        <JoinHero />
        
        <div className="w-full max-w-md flex flex-col gap-12">
          <GamePinCard 
            gamePin={gamePin}
            nickname={nickname}
            onPinChange={setGamePin}
            onNicknameChange={setNickname}
            onJoin={handleJoin}
            status={joinStatus}
          />
          
          <RoomPreviewCard />
        </div>

        <p className="text-gray-400 text-sm text-center">
          Ask your host for the game PIN. <br />
          You can join as a guest with a nickname.
        </p>
      </main>

      <Footer />
    </div>
  )
}
