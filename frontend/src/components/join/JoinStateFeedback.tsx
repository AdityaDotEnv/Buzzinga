import React from 'react'

interface JoinStateFeedbackProps {
  status: 'idle' | 'joining' | 'error'
}

export function JoinStateFeedback({ status }: JoinStateFeedbackProps) {
  if (status !== 'error') return null

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
      <p className="text-red-400 text-sm font-medium">
        Invalid game PIN. Try again.
      </p>
    </div>
  )
}
