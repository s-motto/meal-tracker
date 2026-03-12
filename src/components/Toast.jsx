import { useEffect } from 'react'

export default function Toast({ messaggio, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [messaggio])

  if (!messaggio) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white 
                    px-6 py-3 rounded-full shadow-lg text-sm font-medium z-50
                    animate-fade-in">
      {messaggio}
    </div>
  )
}