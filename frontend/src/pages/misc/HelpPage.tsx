import { MockPage } from './MockPage';
export function HelpPage() {
  return <MockPage title="Help Center" subtitle="Find answers, troubleshoot issues, and contact support — we're here whenever you need us." icon="🛟" accentColor="#38bdf8" sections={[
    { heading: 'Getting Started', body: 'New to Buzzinga? Start here — account setup, creating your first quiz, and joining a game.' },
    { heading: 'Account & Billing', body: 'Manage your profile, reset your password, and handle subscription questions.' },
    { heading: 'Technical Issues', body: 'Connection problems, missing scores, or broken rooms — find fixes for common issues fast.' },
    { heading: 'Contact Support', body: 'Can\'t find an answer? Reach our team via live chat or email and expect a reply within 4 hours.' },
  ]} />;
}
