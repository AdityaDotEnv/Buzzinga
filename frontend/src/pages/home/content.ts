import type { Feature, FooterColumn, LeaderboardPlayer, Quiz, TimelineStep } from './types'

export const taglines = ['Learn Faster', 'Play Smarter', 'Compete Live', 'Host Instantly']

export const heroStats = [
  { label: 'Live rooms today', value: '12.4K' },
  { label: 'Avg. join time', value: '8 sec' },
  { label: 'Completion rate', value: '94%' },
]

export const trustBadges = ['No install required', 'Classroom ready', 'Built for teams']

export const socialStats = [
  { label: 'Players joined', value: '2.8M' },
  { label: 'Quizzes created', value: '84K' },
  { label: 'Community rating', value: '4.9/5' },
  { label: 'Countries active', value: '42' },
]

export const features: Feature[] = [
  {
    title: 'Live Multiplayer Quizzes',
    description:
      'Launch a room in seconds, let players join by PIN, and keep the energy moving with real-time scoring.',
    icon: 'bolt',
    accent: 'violet',
  },
  {
    title: 'AI Quiz Generator',
    description:
      'Turn a topic, prompt, or source into a full game draft with questions, answers, and difficulty tuning.',
    icon: 'spark',
    accent: 'fuchsia',
  },
  {
    title: 'Real-time Leaderboards',
    description: 'Rank updates animate live so every answer feels like a race to the top.',
    icon: 'trophy',
    accent: 'amber',
  },
  {
    title: 'Classroom Mode',
    description: 'Teacher-friendly controls for attendance, pacing, moderation, and end-of-class summaries.',
    icon: 'users',
    accent: 'cyan',
  },
  {
    title: 'Team Battles',
    description: 'Split the room into squads, track momentum, and create comeback moments worth sharing.',
    icon: 'shield',
    accent: 'emerald',
  },
  {
    title: 'Analytics Dashboard',
    description: 'See who struggled, which question spiked, and where to improve the next round.',
    icon: 'chart',
    accent: 'rose',
  },
]

export const trendingQuizzes: Quiz[] = [
  {
    title: 'World Capitals Lightning Round',
    category: 'Geography',
    difficulty: 'Medium',
    players: '1.2K playing',
    theme: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Startup Trivia Night',
    category: 'Business',
    difficulty: 'Hard',
    players: '860 playing',
    theme: 'from-fuchsia-500 to-violet-500',
  },
  {
    title: '90s Music Speed Run',
    category: 'Music',
    difficulty: 'Easy',
    players: '2.4K playing',
    theme: 'from-amber-400 to-rose-500',
  },
  {
    title: 'Math Relay Arena',
    category: 'Classroom',
    difficulty: 'Medium',
    players: '540 playing',
    theme: 'from-emerald-400 to-cyan-500',
  },
]

export const leaderboardPlayers: LeaderboardPlayer[] = [
  { name: 'Nova', score: 980, delta: 24, avatar: 'N' },
  { name: 'Jordan', score: 940, delta: 18, avatar: 'J' },
  { name: 'Ari', score: 912, delta: 12, avatar: 'A' },
  { name: 'Mina', score: 866, delta: 9, avatar: 'M' },
  { name: 'You', score: 842, delta: 33, avatar: 'Y' },
]

export const timeline: TimelineStep[] = [
  {
    title: 'Create',
    copy: 'Start from scratch, generate with AI, or remix a trending quiz template.',
    icon: 'spark',
  },
  {
    title: 'Host',
    copy: 'Share the game code, launch the room, and watch the lobby come alive.',
    icon: 'pin',
  },
  {
    title: 'Compete',
    copy: 'Answer fast, climb the board, and unlock streaks, badges, and rematches.',
    icon: 'trophy',
  },
]

export const recentWinners = ['Mina won the daily challenge', 'Nova streak: 8 games', 'Team Delta claimed a comeback']

export const roomCards = [
  { code: 'B7N4', title: 'History Sprint', players: '128 joined', tone: 'violet' },
  { code: 'Q9X2', title: 'Team Brainwave', players: '64 joined', tone: 'cyan' },
  { code: 'K2L8', title: 'Lunch Break Trivia', players: '41 joined', tone: 'amber' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: ['Create Quiz', 'Join Game', 'Leaderboards', 'Analytics'],
  },
  {
    title: 'Solutions',
    links: ['Classroom Mode', 'Team Battles', 'Events', 'Community Play'],
  },
  {
    title: 'Resources',
    links: ['Help Center', 'Templates', 'Guides', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Privacy'],
  },
]
