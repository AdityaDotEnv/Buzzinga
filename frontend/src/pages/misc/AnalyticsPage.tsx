import { MockPage } from './MockPage';
export function AnalyticsPage() {
  return <MockPage title="Analytics" subtitle="Track quiz performance, player engagement, and real-time session data across your entire library." icon="📊" accentColor="#06b6d4" sections={[
    { heading: 'Session Insights', body: 'See how many players joined, average score, and completion rate for every quiz session.' },
    { heading: 'Question Heatmaps', body: 'Identify which questions trip players up the most with per-question accuracy breakdowns.' },
    { heading: 'Engagement Trends', body: 'Track quiz play volume over time with daily, weekly, and monthly trend charts.' },
    { heading: 'Export Reports', body: 'Download CSV or PDF reports to share results with your team or classroom.' },
  ]} />;
}
