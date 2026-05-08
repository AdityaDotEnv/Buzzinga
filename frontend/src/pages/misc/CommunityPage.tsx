import { MockPage } from './MockPage';
export function CommunityPage() {
  return <MockPage title="Community Play" subtitle="Discover, share, and compete on community-created quizzes from players around the world." icon="🌍" accentColor="#22d3ee" sections={[
    { heading: 'Public Library', body: 'Browse thousands of community quizzes sorted by topic, difficulty, and player rating.' },
    { heading: 'Challenges', body: 'Issue a challenge to any player or the whole community and climb the weekly challenge board.' },
    { heading: 'Seasonal Events', body: 'Join rotating themed events — trivia weeks, speed rounds, and subject-specific tournaments.' },
    { heading: 'Creator Profiles', body: 'Follow top quiz creators and get notified when they publish something new.' },
  ]} />;
}
