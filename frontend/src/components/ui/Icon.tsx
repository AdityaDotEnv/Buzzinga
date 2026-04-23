type IconName =
  | 'spark'
  | 'play'
  | 'trophy'
  | 'chart'
  | 'users'
  | 'pin'
  | 'search'
  | 'shield'
  | 'bolt'
  | 'gift'
  | 'menu'
  | 'close'

export type { IconName }

export function Icon({ name }: { name: IconName }) {
  switch (name) {
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm7 10 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
        </svg>
      )
    case 'play':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      )
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4h10v3h3v2c0 3.3-2.2 6-5 6-.6 0-1.2-.1-1.8-.3A4 4 0 0 1 13 17v2h3v2H8v-2h3v-2a4 4 0 0 1-.2-2.3C10.2 15.9 9.6 16 9 16c-2.8 0-5-2.7-5-6V7h3V4Zm0 3H6v1c0 2 1.1 4 3 4 .7 0 1.1-.1 1.6-.3A8.9 8.9 0 0 1 7 7Zm10 0a8.9 8.9 0 0 1-3.6 4.7c.5.2.9.3 1.6.3 1.9 0 3-2 3-4V7h-1Z" />
        </svg>
      )
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 19V5h2v12h12v2H5Zm4-3V9h2v7H9Zm4 0V7h2v9h-2Zm4 0v-5h2v5h-2Z" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM3 20v-1c0-2.8 2.7-5 6-5s6 2.2 6 5v1H3Zm12 0v-1c0-1.1-.3-2.2-.9-3.1 1.2-.1 2.4.1 3.4.7 1.1.6 1.8 1.6 1.8 2.9v.5h-4.3Z" />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a6 6 0 0 0-6 6c0 4.2 6 14 6 14s6-9.8 6-14a6 6 0 0 0-6-6Zm0 8.5A2.5 2.5 0 1 1 12 5a2.5 2.5 0 0 1 0 5.5Z" />
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15.5 14 4.5 4.5-1.5 1.5L14 15.5a7 7 0 1 1 1.5-1.5ZM10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 5 5v6c0 5 3.2 8.7 7 11 3.8-2.3 7-6 7-11V5l-7-3Zm-1 12-3-3 1.4-1.4L11 11.2l3.6-3.6L16 9l-5 5Z" />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12H12l1-8Z" />
        </svg>
      )
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 7h-2.2A3 3 0 0 0 13 3.8L12 5l-1-1.2A3 3 0 0 0 6.2 7H4v4h8V7h2v4h8V7Zm-10 6H4v8h6v-8Zm2 0v8h8v-8h-8Z" />
        </svg>
      )
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v2H4V7Zm0 8h16v2H4v-2Zm0-4h16v2H4v-2Z" />
        </svg>
      )
    case 'close':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 5.6 5.6 6 11.6 12l-6 6 .4.4L12 12.4l6 6 .4-.4-6-6 6-6-.4-.4-6 6-6-6Z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" />
        </svg>
      )
  }
}
