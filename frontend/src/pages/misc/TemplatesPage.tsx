import { MockPage } from './MockPage';
export function TemplatesPage() {
  return <MockPage title="Templates" subtitle="Jump-start your next quiz with professionally designed templates for every occasion and subject." icon="📋" accentColor="#c084fc" sections={[
    { heading: 'Trivia Packs', body: 'General knowledge, pop culture, sports, science — ready to play with zero editing needed.' },
    { heading: 'Education', body: 'Curriculum-aligned templates for math, history, science, and language arts from K-12 to university.' },
    { heading: 'Icebreakers', body: 'Fun, low-stakes templates perfect for team meetings, onboarding sessions, and kickoffs.' },
    { heading: 'Seasonal', body: 'Holiday themes, new year countdowns, and seasonal trivia packs refreshed every quarter.' },
  ]} />;
}
