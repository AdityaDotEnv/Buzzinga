import { MockPage } from './MockPage';
export function ClassroomPage() {
  return <MockPage title="Classroom Mode" subtitle="Built for educators — manage students, sync sessions, and review results after every quiz." icon="🏫" accentColor="#4ade80" sections={[
    { heading: 'Student Roster', body: 'Import your class roster and have students join with verified names — no nickname chaos.' },
    { heading: 'Teacher Dashboard', body: 'Monitor every student in real time, pause the quiz, and reveal answers at your own pace.' },
    { heading: 'Grade Export', body: 'Export quiz results directly to common gradebook formats including CSV and Google Sheets.' },
    { heading: 'Curriculum Tags', body: 'Tag questions by topic, standard, or chapter so you can filter and assign targeted reviews.' },
  ]} />;
}
