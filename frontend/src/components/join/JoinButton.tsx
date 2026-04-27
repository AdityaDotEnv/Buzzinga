import React from 'react'

interface JoinButtonProps {
  onClick: () => void
  status: 'idle' | 'joining' | 'error'
}

export function JoinButton({ onClick, status }: JoinButtonProps) {
  const isJoining = status === 'joining'
  
  return (
    <button
      onClick={onClick}
      disabled={isJoining}
      className={`
        w-full h-14 rounded-[13px] font-bold text-sm uppercase tracking-wider transition-all
        flex items-center justify-center gap-3
        ${isJoining 
          ? 'bg-purple-900/50 text-purple-300 cursor-not-allowed border border-purple-800/30' 
          : 'bg-[rgb(225,86,124)] text-white hover:bg-[rgb(207,76,114)] hover:-translate-y-0.5 active:translate-y-0 border border-[rgb(187,69,102)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_16px_30px_rgba(225,86,124,0.26)]'}
      `}
    >
      {isJoining ? (
        <>
          <div className="w-5 h-5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
          Joining Room...
        </>
      ) : (
        'Join Game'
      )}
    </button>
  )
}
