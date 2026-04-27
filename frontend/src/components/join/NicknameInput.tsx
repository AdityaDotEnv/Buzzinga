import React from 'react'

interface NicknameInputProps {
  value: string
  onChange: (value: string) => void
}

export function NicknameInput({ value, onChange }: NicknameInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="nickname" className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">
        Player Nickname
      </label>
      <input
        id="nickname"
        type="text"
        placeholder="Choose a nickname"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#150f23] border border-[#362d59] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#6a5fc1] focus:ring-1 focus:ring-[#6a5fc1] transition-all outline-none"
      />
    </div>
  )
}
