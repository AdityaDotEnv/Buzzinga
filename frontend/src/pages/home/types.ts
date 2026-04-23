import type { IconName } from '../../components/ui/Icon'

export type Feature = {
  title: string
  description: string
  icon: IconName
  accent: string
}

export type Quiz = {
  title: string
  category: string
  difficulty: string
  players: string
  theme: string
}

export type LeaderboardPlayer = {
  name: string
  score: number
  delta: number
  avatar: string
}

export type TimelineStep = {
  title: string
  copy: string
  icon: IconName
}

export type FooterColumn = {
  title: string
  links: string[]
}
