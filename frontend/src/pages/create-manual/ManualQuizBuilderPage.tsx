import React from 'react';
import { BuilderHero } from '../../components/manual-builder/BuilderHero';
import { QuizMetadataPanel } from '../../components/manual-builder/QuizMetadataPanel';
import { QuestionCanvas } from '../../components/manual-builder/QuestionCanvas';
import { QuestionSettingsSidebar } from '../../components/manual-builder/QuestionSettingsSidebar';
import { Navbar } from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

export function ManualQuizBuilderPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell min-h-screen bg-[#080c18] text-slate-100 flex flex-col">
      <div className="app-background fixed inset-0 pointer-events-none" aria-hidden="true">
        <span className="orb orb-one bg-pink-500/10 blur-[120px] absolute w-[500px] h-[500px] rounded-full top-[-200px] right-[-100px]" />
        <span className="orb orb-two bg-cyan-500/10 blur-[120px] absolute w-[600px] h-[600px] rounded-full bottom-[-200px] left-[-200px]" />
        <span className="grid absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <Navbar
        mobileMenuOpen={false}
        onToggleMobileMenu={() => {}}
        onLaunch={() => {}}
        brandHref="/"
        rightContent={
          <button onClick={() => navigate('/create-quiz')} className="ghost-button">
            Exit Builder
          </button>
        }
      />

      <main className="flex-1 relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <BuilderHero />
        
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
            <QuizMetadataPanel />
            <QuestionCanvas />
          </div>
          
          <div className="w-full xl:w-[360px] shrink-0">
            <QuestionSettingsSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
