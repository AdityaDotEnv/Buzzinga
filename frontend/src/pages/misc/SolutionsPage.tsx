import { MockPage } from './MockPage';
export function SolutionsPage() {
  return <MockPage title="Solutions" subtitle="Buzzinga powers everything from classroom quizzes to massive live events. Choose your use case." icon="💡" accentColor="#a78bfa" sections={[
    { heading: 'Education', body: 'Engage students with gamified knowledge checks, formative assessments, and instant feedback.' },
    { heading: 'Corporate Training', body: 'Reinforce learning outcomes with competitive quizzes tailored for teams and onboarding.' },
    { heading: 'Live Events', body: 'Host thousands of concurrent players at conferences, hackathons, and community events.' },
    { heading: 'Marketing Campaigns', body: 'Drive brand engagement with branded quiz experiences and giveaway mechanics.' },
  ]} />;
}
