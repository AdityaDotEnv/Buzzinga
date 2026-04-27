import React from 'react'
import { NicknameInput } from './NicknameInput'
import { JoinButton } from './JoinButton'
import { JoinStateFeedback } from './JoinStateFeedback'

interface GamePinCardProps {
  gamePin: string
  nickname: string
  onPinChange: (value: string) => void
  onNicknameChange: (value: string) => void
  onJoin: () => void
  status: 'idle' | 'joining' | 'error'
}

export function GamePinCard({
  gamePin,
  nickname,
  onPinChange,
  onNicknameChange,
  onJoin,
  status
}: GamePinCardProps) {
  return (
    <div className="bg-[#150f23]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-2">
        <label htmlFor="gamePin" className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">
          Game PIN
        </label>
        <input
          id="gamePin"
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Game PIN"
          value={gamePin}
          onChange={(e) => onPinChange(e.target.value.replace(/\D/g, ''))}
          className="w-full bg-[#1f1633] border border-[#362d59] rounded-2xl px-6 py-5 text-3xl md:text-4xl font-bold text-center tracking-[0.2em] text-white placeholder:text-gray-700 placeholder:text-xl placeholder:tracking-normal focus:border-[#6a5fc1] focus:ring-1 focus:ring-[#6a5fc1] transition-all outline-none"
        />
      </div>

      <NicknameInput value={nickname} onChange={onNicknameChange} />

      <JoinStateFeedback status={status} />

      <JoinButton onClick={onJoin} status={status} />
    </div>
  )
}
