import React from 'react';
import { AIHero } from '../../components/ai-generator/AIHero';
import { PromptComposerCard } from '../../components/ai-generator/PromptComposerCard';
import { GenerationPreviewCard } from '../../components/ai-generator/GenerationPreviewCard';
import { Navbar } from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

export function AIQuizGeneratorPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell min-h-screen bg-[#080c18] text-slate-100 flex flex-col">
      <div className="app-background fixed inset-0 pointer-events-none" aria-hidden="true">
        <span className="orb orb-one bg-orange-500/10 blur-[120px] absolute w-[500px] h-[500px] rounded-full top-[-200px] right-[-100px]" />
        <span className="orb orb-two bg-pink-500/10 blur-[120px] absolute w-[600px] h-[600px] rounded-full bottom-[-200px] left-[-200px]" />
        <span className="grid absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <Navbar
        mobileMenuOpen={false}
        onToggleMobileMenu={() => {}}
        onLaunch={() => {}}
        brandHref="/"
        rightContent={
          <button onClick={() => navigate('/create-quiz')} className="ghost-button">
            Exit AI Studio
          </button>
        }
      />

      <main className="flex-1 relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        <AIHero />
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full min-w-0">
            <PromptComposerCard />
          </div>
          
          <div className="flex-1 w-full min-w-0">
            <GenerationPreviewCard />
          </div>
        </div>
      </main>
    </div>
  );
}
