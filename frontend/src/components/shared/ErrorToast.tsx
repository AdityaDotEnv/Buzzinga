import { useEffect } from 'react'

interface ErrorToastProps {
  message: string
  onClose: () => void
}

export function ErrorToast({ message, onClose }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#1a0b0b] border border-[#ef4444]/30 rounded-2xl p-6 shadow-2xl flex items-center gap-4 min-w-[320px]">
        <div className="w-12 h-12 rounded-full bg-[#ef4444] flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#ef4444] font-bold uppercase text-[10px] tracking-widest">Error</p>
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
