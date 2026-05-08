import { MockPage } from './MockPage';
export function EventsPage() {
  return <MockPage title="Events" subtitle="Run massive live quiz events with thousands of simultaneous players and a spectacular host interface." icon="🎪" accentColor="#ec4899" sections={[
    { heading: 'Mass Participation', body: 'Tested for 10,000+ concurrent players — no lag, no crashes, just instant results.' },
    { heading: 'Branded Lobby', body: 'Customise the waiting screen with your event branding, countdown, and sponsor logos.' },
    { heading: 'Host Controls', body: 'Full presenter mode lets you pace the quiz, spotlight answers, and hype the crowd.' },
    { heading: 'Post-Event Recap', body: 'Automated recap email with final leaderboard, question stats, and shareable highlights.' },
  ]} />;
}
