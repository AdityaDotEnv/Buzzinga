import type { IconName } from '../../components/ui/Icon'

export type CreationMode = {
  id: 'scratch' | 'ai' | 'import' | 'remix'
  title: string
  copy: string
  icon: IconName
  tone: string
}

export type TemplateCard = {
  title: string
  category: string
  badge: string
  accent: string
}

export type PromptChip = {
  label: string
  prompt: string
}
