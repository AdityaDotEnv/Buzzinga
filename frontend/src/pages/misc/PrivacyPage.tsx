import { MockPage } from './MockPage';
export function PrivacyPage() {
  return <MockPage title="Privacy Policy" subtitle="We take your data seriously. Here's exactly what we collect, how we use it, and your rights." icon="🔒" accentColor="#94a3b8" sections={[
    { heading: 'Data We Collect', body: 'Username, email (optional), quiz activity, scores, and session metadata. We never sell your data.' },
    { heading: 'How We Use It', body: 'To run the platform, improve features, and send optional product updates you can unsubscribe from any time.' },
    { heading: 'Data Retention', body: 'Account data is retained until you delete your account. Session data is anonymised after 90 days.' },
    { heading: 'Your Rights', body: 'You can request a data export, correct inaccurate data, or delete your account at any time from settings.' },
  ]} />;
}
