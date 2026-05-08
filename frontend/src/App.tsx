import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import { CreateQuizPage } from './pages/create-quiz/CreateQuizPage'
import { JoinQuizPage } from './pages/join-quiz/JoinQuizPage'
import { ManualQuizBuilderPage } from './pages/create-manual/ManualQuizBuilderPage'
import { AIQuizGeneratorPage } from './pages/create-ai/AIQuizGeneratorPage'
import { RoomCodePage } from './pages/play/RoomCodePage'
import { ExploreQuizzesPage } from './pages/explore/ExploreQuizzesPage'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { LeaderboardsPage } from './pages/leaderboards/LeaderboardsPage'
import { AnalyticsPage } from './pages/misc/AnalyticsPage'
import { SolutionsPage } from './pages/misc/SolutionsPage'
import { ClassroomPage } from './pages/misc/ClassroomPage'
import { TeamBattlesPage } from './pages/misc/TeamBattlesPage'
import { EventsPage } from './pages/misc/EventsPage'
import { CommunityPage } from './pages/misc/CommunityPage'
import { ResourcesPage } from './pages/misc/ResourcesPage'
import { HelpPage } from './pages/misc/HelpPage'
import { TemplatesPage } from './pages/misc/TemplatesPage'
import { GuidesPage } from './pages/misc/GuidesPage'
import { StatusPage } from './pages/misc/StatusPage'
import { AboutPage } from './pages/misc/AboutPage'
import { CareersPage } from './pages/misc/CareersPage'
import { ContactPage } from './pages/misc/ContactPage'
import { PrivacyPage } from './pages/misc/PrivacyPage'
import { TermsPage } from './pages/misc/TermsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/explore" element={<ExploreQuizzesPage />} />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />
      <Route path="/create-quiz" element={<CreateQuizPage />} />
      <Route path="/create/manual" element={<ManualQuizBuilderPage />} />
      <Route path="/create/ai" element={<AIQuizGeneratorPage />} />
      <Route path="/join" element={<JoinQuizPage />} />
      <Route path="/play/:roomCode" element={<RoomCodePage />} />
      <Route path="/live" element={<RoomCodePage />} />
      {/* Misc / marketing pages */}
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/classroom" element={<ClassroomPage />} />
      <Route path="/team-battles" element={<TeamBattlesPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/guides" element={<GuidesPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
