type NoticeBarProps = {
  notice: string | null
}

export function NoticeBar({ notice }: NoticeBarProps) {
  return (
    <div className={`notice-bar ${notice ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {notice}
    </div>
  )
}
