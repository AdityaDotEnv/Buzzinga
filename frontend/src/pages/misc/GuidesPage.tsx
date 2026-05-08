import { MockPage } from './MockPage';
export function GuidesPage() {
  return <MockPage title="Guides" subtitle="Deep-dive articles to help you host better quizzes, engage more players, and get more from Buzzinga." icon="🗺️" accentColor="#34d399" sections={[
    { heading: 'Writing Great Questions', body: 'Tips on clarity, difficulty curve, distractor quality, and avoiding ambiguous wording.' },
    { heading: 'Hosting Live Sessions', body: 'How to hype the room, pace the quiz, and handle technical hiccups mid-session.' },
    { heading: 'Building a Quiz Series', body: 'Create weekly recurring quizzes that keep players coming back with progressively harder content.' },
    { heading: 'Using Analytics', body: 'How to read your quiz data to improve question quality and identify knowledge gaps.' },
  ]} />;
}
