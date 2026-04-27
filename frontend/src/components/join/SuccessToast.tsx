import React, { useEffect } from 'react'

interface SuccessToastProps {
  message: string
  onClose: () => void
}

export function SuccessToast({ message, onClose }: SuccessToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#422082] border border-[#6a5fc1] rounded-2xl p-6 shadow-2xl flex items-center gap-4 min-w-[320px]">
        <div className="w-12 h-12 rounded-full bg-[#c2ef4e] flex items-center justify-center shadow-[0_0_20px_rgba(194,239,78,0.3)]">
          <svg className="w-6 h-6 text-[#150f23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#c2ef4e] font-bold uppercase text-[10px] tracking-widest">Success</p>
          <p className="text-white font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
