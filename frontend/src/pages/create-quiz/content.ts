import type { CreationMode, PromptChip, TemplateCard } from './types'

export const creationModes: CreationMode[] = [
  {
    id: 'scratch',
    title: 'Start from scratch',
    copy: 'Build the full quiz yourself with a blank canvas, custom rounds, and your own pacing.',
    icon: 'spark',
    tone: 'from-fuchsia-500 to-rose-500',
  },
  {
    id: 'ai',
    title: 'Create with AI',
    copy: 'Describe the topic and get a ready-to-edit quiz draft with questions, answers, and difficulty.',
    icon: 'bolt',
    tone: 'from-amber-400 to-pink-500',
  },
  {
    id: 'import',
    title: 'Import content',
    copy: 'Bring in your slides, notes, or docs and turn them into a fast-moving play session.',
    icon: 'gift',
    tone: 'from-cyan-400 to-sky-500',
  },
  {
    id: 'remix',
    title: 'Remix a template',
    copy: 'Choose a proven format and tune the visuals, questions, and scoring to fit your audience.',
    icon: 'play',
    tone: 'from-emerald-400 to-teal-500',
  },
]

export const promptChips: PromptChip[] = [
  { label: 'History review', prompt: 'Make a 12-question review quiz for world history with 3 difficulty levels.' },
  { label: 'Team battle', prompt: 'Build a high-energy team battle quiz about startups and product trivia.' },
  { label: 'Class starter', prompt: 'Create a short warm-up quiz about science with playful, easy questions.' },
]

export const templates: TemplateCard[] = [
  { title: 'Review Sprint', category: 'Classroom', badge: 'Fast setup', accent: 'from-fuchsia-500 to-rose-500' },
  { title: 'Trivia Night', category: 'Events', badge: 'Party mode', accent: 'from-amber-400 to-orange-500' },
  { title: 'Quiz Relay', category: 'Teams', badge: 'Competitive', accent: 'from-cyan-400 to-sky-500' },
  { title: 'Lightning Round', category: 'Live', badge: 'Quick win', accent: 'from-emerald-400 to-teal-500' },
]

export const setupSteps = [
  { text: 'Choose your format', icon: 'Layout' },
  { text: 'Add prompts and answers', icon: 'FileText' },
  { text: 'Tune scoring and pacing', icon: 'Sliders' },
  { text: 'Preview and publish', icon: 'Rocket' },
]
