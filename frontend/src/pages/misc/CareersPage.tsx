import { MockPage } from './MockPage';
export function CareersPage() {
  return <MockPage title="Careers" subtitle="Help us build the future of live, competitive learning. We're hiring across engineering, design, and education." icon="🚀" accentColor="#818cf8" sections={[
    { heading: 'Engineering', body: 'Senior full-stack engineers, WebSocket specialists, and infrastructure engineers. Remote-first.' },
    { heading: 'Design', body: 'Product designers who care deeply about interaction design, accessibility, and motion.' },
    { heading: 'Education', body: 'Curriculum designers and instructional designers to shape our template and content library.' },
    { heading: 'Our Culture', body: 'Async-first, outcome-driven, and deeply collaborative. We ship fast and learn together.' },
  ]} />;
}
