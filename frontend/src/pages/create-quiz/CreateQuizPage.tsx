import { useState } from 'react'
import '../../App.css'
import { Navbar } from '../home/sections/Navbar'
import { MobileDrawer } from '../home/sections/MobileDrawer'
import { NoticeBar } from '../home/sections/NoticeBar'
import { CreateQuizHero } from './sections/CreateQuizHero'
import { CreationModes } from './sections/CreationModes'
import { AiStudioSection } from './sections/AiStudioSection'
import { TemplateShelf } from './sections/TemplateShelf'
import { CreateQuizFooter } from './sections/CreateQuizFooter'
import type { CreationMode } from './types'

type CreateQuizPageProps = {
  onGoHome: () => void
}

export function CreateQuizPage({ onGoHome }: CreateQuizPageProps) {
  const [selectedMode, setSelectedMode] = useState<CreationMode['id']>('scratch')
  const [notice, setNotice] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const createLinks = [
    { label: 'Overview', href: '#' },
    { label: 'Scratch', href: '#' },
    { label: 'AI Studio', href: '#' },
    { label: 'Templates', href: '#' },
    { label: 'Publish', href: '#' },
  ]

  const handleAction = (message: string) => {
    setNotice(message)
  }

  return (
    <div className="app-shell create-quiz-shell">
      <div className="app-background create-quiz-background" aria-hidden="true">
        <span className="orb orb-one create-orb-one" />
        <span className="orb orb-two create-orb-two" />
        <span className="grid" />
      </div>

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((value) => !value)}
        onLaunch={() => undefined}
        links={createLinks}
        brandHref="/"
      />
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLaunch={() => undefined} links={createLinks} />

      <main className="create-quiz-main">
        <CreateQuizHero
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStartScratch={() => handleAction('Scratch workspace opened')}
          onStartAi={() => handleAction('AI quiz builder opened')}
          onGoHome={onGoHome}
        />

        <CreationModes selectedMode={selectedMode} onSelectMode={setSelectedMode} />
        <AiStudioSection onGenerate={() => handleAction('AI draft preview ready')} />
        <TemplateShelf />
      </main>

      <CreateQuizFooter onGoHome={onGoHome} />
      <NoticeBar notice={notice} />
    </div>
  )
}
