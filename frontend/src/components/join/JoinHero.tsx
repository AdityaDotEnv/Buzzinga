import React from 'react'

export function JoinHero() {
  return (
    <section className="flex flex-col items-center text-center gap-6">
      <div className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#c2ef4e] text-xs font-semibold tracking-wider uppercase">
        Live Multiplayer
      </div>
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
        Join a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Live Quiz</span>
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
        Enter a game PIN and jump into the action in seconds.
      </p>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] -z-10 pointer-events-none" />
    </section>
  )
}
