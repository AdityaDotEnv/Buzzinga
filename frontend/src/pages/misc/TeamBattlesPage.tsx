import { MockPage } from './MockPage';
export function TeamBattlesPage() {
  return <MockPage title="Team Battles" subtitle="Pit squads against each other in head-to-head quiz battles. Perfect for hackathons, offsites, and company events." icon="⚔️" accentColor="#f97316" sections={[
    { heading: 'Team Rooms', body: 'Create named teams and assign players before the quiz begins — scores pool automatically.' },
    { heading: 'Live Score Feed', body: 'A live team scoreboard updates after every question so tension builds throughout.' },
    { heading: 'Tiebreaker Rounds', body: 'Automatic sudden-death tiebreaker questions when teams finish level on points.' },
    { heading: 'Custom Themes', body: 'Brand team battles with your org colors, logos, and a custom victory animation.' },
  ]} />;
}
