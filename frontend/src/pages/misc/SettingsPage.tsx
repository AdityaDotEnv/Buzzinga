import { MockPage } from './MockPage';
export function SettingsPage() {
  return <MockPage
    title="Account Settings"
    subtitle="Manage your profile, security, and notification preferences."
    icon="⚙️"
    accentColor="#94a3b8"
    sections={[
      { heading: 'Profile Information', body: 'Update your username, bio, and public profile details. Changes take effect immediately across all live sessions.' },
      { heading: 'Security & Privacy', body: 'Change your password or enable Two-Factor Authentication (2FA) for enhanced account security.' },
      { heading: 'Game Preferences', body: 'Configure default quiz timers, sound effects, and accessibility options for your hosted rooms.' },
      { heading: 'Notification Settings', body: 'Control which emails and in-app alerts you receive regarding community activity and platform updates.' },
    ]}
  />;
}
