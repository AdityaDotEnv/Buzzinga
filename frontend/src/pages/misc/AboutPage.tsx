import { MockPage } from './MockPage';
export function AboutPage() {
  return <MockPage title="About Buzzinga" subtitle="We believe learning is more powerful when it feels like play. Buzzinga was built to make that happen at any scale." icon="⚡" accentColor="#f472b6" sections={[
    { heading: 'Our Mission', body: 'Make competitive, real-time quizzing accessible to every classroom, team, and community on earth.' },
    { heading: 'The Team', body: 'A small, passionate group of engineers, designers, and educators obsessed with engagement and learning.' },
    { heading: 'Our Story', body: 'Started as a side project to replace boring classroom review, Buzzinga grew into a platform serving thousands of educators and event hosts.' },
    { heading: 'Open Source', body: 'Parts of Buzzinga are open source. We believe in giving back to the dev community that helped build us.' },
  ]} />;
}
