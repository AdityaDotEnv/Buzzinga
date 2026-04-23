import type { JoinHeroMessage, JoinTip, RoomPreview } from './types'

export const heroMessages: JoinHeroMessage[] = [
  {
    title: 'Jump into the room in seconds.',
    copy: 'Enter a code, add a name, and you are in the game.',
  },
  {
    title: 'Fast join, loud competition.',
    copy: 'The room code is the doorway. Your name is the scoreboard.',
  },
  {
    title: 'One code. One tap. Game on.',
    copy: 'Quick entry, clear motion, and a join screen that feels alive.',
  },
]

export const joinTips: JoinTip[] = [
  {
    title: 'Ask the host for the code',
    copy: 'Room codes are shown on the main screen and usually refresh per session.',
  },
  {
    title: 'Use a readable name',
    copy: 'Short names keep the leaderboard clean and easy to follow.',
  },
  {
    title: 'Join from any device',
    copy: 'The page is built to feel good on phone, tablet, and desktop.',
  },
]

export const roomPreviews: RoomPreview[] = [
  { code: 'Q7K2', title: 'History Sprint', players: '128 waiting', tone: 'from-fuchsia-500 to-rose-500' },
  { code: 'M4H8', title: 'Classroom Clash', players: '64 waiting', tone: 'from-cyan-400 to-sky-500' },
  { code: 'P9T1', title: 'Trivia Arena', players: '32 waiting', tone: 'from-amber-400 to-orange-500' },
]
