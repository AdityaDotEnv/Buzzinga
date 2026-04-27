import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { Footer } from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/Navbar";
import { NoticeBar } from "../home/sections/NoticeBar";
import { CreateQuizHero } from "./sections/CreateQuizHero";
import { CreationModes } from "./sections/CreationModes";
import { AiStudioSection } from "./sections/AiStudioSection";
import { TemplateShelf } from "./sections/TemplateShelf";
import type { CreationMode } from "./types";

export function CreateQuizPage() {
  const [selectedMode, setSelectedMode] =
    useState<CreationMode["id"]>("scratch");
  const [notice, setNotice] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const createLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Scratch", href: "#scratch" },
    { label: "AI Studio", href: "#ai-studio" },
    { label: "Templates", href: "#templates" },
  ];

  const handleAction = (message: string) => {
    setNotice(message);
  };

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
            <summary className="ghost-button workspace-trigger">
              Workspace
            </summary>
            <div className="menu-panel workspace-menu-panel">
              <button type="button" onClick={() => navigate("/")}>
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
          onStartScratch={() => navigate("/create/manual")}
          onStartAi={() => navigate("/create/ai")}
          onGoHome={() => navigate("/")}
        />

        <CreationModes
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
        />
        <AiStudioSection
          onGenerate={() => navigate("/create/ai")}
        />
        <TemplateShelf />
      </main>

      <Footer />
      <NoticeBar notice={notice} />
    </div>
  );
}
