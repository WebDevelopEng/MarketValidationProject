import React from 'react'
import { User } from 'lucide-react'

export default function DefaultAvatar({ name, size = 200, className = '', showHoverEffect = false }) {
  // Extract initials from name
  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name[0].toUpperCase()
  }

  // Generate a color based on name (consistent color for same name)
  const getColorFromName = (name) => {
    if (!name) return 'bg-blue-600'
    const colors = [
      'bg-blue-600',
      'bg-purple-600',
      'bg-pink-600',
      'bg-rose-600',
      'bg-indigo-600',
      'bg-cyan-600',
      'bg-teal-600',
      'bg-green-600',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const initials = getInitials(name)
  const bgColor = getColorFromName(name)

  return (
    <div
      className={`rounded-full flex items-center justify-center ${bgColor} ring-2 ring-gray-700 ${showHoverEffect ? 'transition-all duration-200 group-hover:brightness-70' : ''} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`,
      }}
    >
      <span className="font-bold text-white">{initials}</span>
    </div>
  )
}
