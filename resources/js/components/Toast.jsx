import React, { useState, useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

export function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm">
        <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
        <p className="text-white font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-gray-800 rounded transition-colors"
        >
          <X size={18} className="text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = (message, duration = 3000) => {
    setToast({ id: Date.now(), message })
    setTimeout(() => setToast(null), duration)
  }

  const closeToast = () => setToast(null)

  return {
    toast,
    showToast,
    closeToast,
    ToastComponent: toast ? <Toast message={toast.message} onClose={closeToast} /> : null
  }
}
