import { MockPage } from './MockPage';
export function TermsPage() {
  return <MockPage
    title="Terms & Conditions"
    subtitle="By using Buzzinga you agree to these terms. Please read them carefully — they're written in plain English, not legalese."
    icon="📜"
    accentColor="#818cf8"
    sections={[
      { heading: '1. Acceptance of Terms', body: 'By creating an account or using any Buzzinga service you confirm you are at least 13 years old and agree to these Terms. If you are under 18 a parent or guardian must review and accept on your behalf.' },
      { heading: '2. Account Responsibilities', body: 'You are responsible for all activity under your account. Keep your password secure and notify us immediately at security@buzzinga.app if you suspect unauthorised access.' },
      { heading: '3. Acceptable Use', body: 'You may not use Buzzinga to distribute harmful, illegal, or abusive content. Automated bots, scraping, or reverse-engineering the platform are prohibited. Violations may result in immediate account termination.' },
      { heading: '4. Content Ownership', body: 'You retain ownership of quiz content you create. By publishing it on Buzzinga you grant us a worldwide, royalty-free licence to host, display, and distribute it on the platform.' },
      { heading: '5. Service Availability', body: 'We aim for 99.9% uptime but cannot guarantee uninterrupted access. Scheduled maintenance will be announced on our Status page. We are not liable for losses caused by downtime.' },
      { heading: '6. Limitation of Liability', body: 'Buzzinga is provided "as is". We are not liable for indirect, incidental, or consequential damages arising from your use of the service, to the maximum extent permitted by applicable law.' },
      { heading: '7. Changes to Terms', body: 'We may update these Terms from time to time. Significant changes will be communicated via email or an in-app notice. Continued use of Buzzinga after changes constitutes acceptance.' },
      { heading: '8. Governing Law', body: 'These Terms are governed by the laws of the jurisdiction in which Buzzinga is incorporated, without regard to its conflict-of-law provisions.' },
    ]}
  />;
}
