import { useState } from 'react'
import '../../App.css'
import { Navbar } from '../../components/layout/Navbar'
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
    { label: 'Overview', href: '#overview' },
    { label: 'Scratch', href: '#scratch' },
    { label: 'AI Studio', href: '#ai-studio' },
    { label: 'Templates', href: '#templates' },
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
        mobileLinks={createLinks}
        brandHref="/"
        rightContent={
          <details className="workspace-menu">
            <summary className="ghost-button workspace-trigger">Workspace</summary>
            <div className="menu-panel workspace-menu-panel">
              <button type="button" onClick={onGoHome}>
                Back to home
              </button>
              <a href="#overview">Overview</a>
              <a href="#scratch">Scratch</a>
              <a href="#ai-studio">AI Studio</a>
              <a href="#templates">Templates</a>
            </div>
          </details>
        }
      />

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
