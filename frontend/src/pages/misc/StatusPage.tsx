import { MockPage } from './MockPage';
export function StatusPage() {
  return <MockPage title="Platform Status" subtitle="Real-time health of all Buzzinga services — API, WebSocket, auth, and database." icon="🟢" accentColor="#4ade80" sections={[
    { heading: 'API Gateway', body: '✅ Operational — average response time 42 ms over the last 24 hours.' },
    { heading: 'WebSocket Server', body: '✅ Operational — live room sync running with 99.97% uptime this month.' },
    { heading: 'Authentication', body: '✅ Operational — login and token issuance functioning normally.' },
    { heading: 'Database', body: '✅ Operational — all read/write operations healthy. Last incident: none.' },
  ]} />;
}
