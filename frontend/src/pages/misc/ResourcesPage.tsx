import { MockPage } from './MockPage';
export function ResourcesPage() {
  return <MockPage title="Resources" subtitle="Everything you need to get the most out of Buzzinga — guides, templates, and a thriving help center." icon="📚" accentColor="#facc15" sections={[
    { heading: 'Help Center', body: 'Searchable documentation for every feature, with step-by-step walkthroughs and FAQs.' },
    { heading: 'Quiz Templates', body: 'Start fast with pre-built templates for education, trivia, onboarding, and more.' },
    { heading: 'Creator Guides', body: 'Best practices for writing engaging questions, setting time limits, and maximising participation.' },
    { heading: 'API Reference', body: 'Developer docs for embedding Buzzinga quizzes into your own apps and platforms.' },
  ]} />;
}
