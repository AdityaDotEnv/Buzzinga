import React from 'react'

export function RoomPreviewCard() {
  return (
    <div className="bg-[#150f23]/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Room Preview
        </span>
        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-400 font-bold uppercase tracking-tight">Active</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white font-semibold">Science Trivia Night</h3>
        <p className="text-gray-500 text-xs">Host: Dr. Quizzo</p>
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter">Players</span>
          <span className="text-sm text-gray-300 font-medium">12 / 50</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter">Status</span>
          <span className="text-sm text-gray-300 font-medium">Waiting for start</span>
        </div>
      </div>
    </div>
  )
}
