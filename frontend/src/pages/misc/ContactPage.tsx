import { MockPage } from './MockPage';
export function ContactPage() {
  return <MockPage title="Contact Us" subtitle="Get in touch with the Buzzinga team — whether it's feedback, a partnership pitch, or just a hello." icon="📬" accentColor="#fb923c" sections={[
    { heading: 'General Enquiries', body: 'Email us at hello@buzzinga.app — we read and reply to every message within 24 hours.' },
    { heading: 'Support', body: 'For technical issues, visit the Help Center first. For urgent problems, use live chat in the app.' },
    { heading: 'Partnerships', body: 'Interested in integrating Buzzinga or co-marketing? Reach out at partnerships@buzzinga.app.' },
    { heading: 'Press & Media', body: 'Journalists and content creators can contact press@buzzinga.app for assets and interviews.' },
  ]} />;
}
