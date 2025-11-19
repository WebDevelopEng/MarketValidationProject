import React, { useState, useRef, useEffect } from 'react'
import { X, Send, ChevronDown, Minimize2, Maximize2 } from 'lucide-react'

export default function ChatWindow({ isOpen, onClose, designer }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'designer', text: 'Hi! How can I help you with your design project?', timestamp: new Date(Date.now() - 5 * 60000) }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showConversationMenu, setShowConversationMenu] = useState(false)
  const messagesEndRef = useRef(null)

  // Sample previous conversations
  const previousDesigners = [
    { id: 2, name: 'Owen', avatar: '/StaticImages/Designer3.jpg', role: 'Brand Identity Designer' },
    { id: 3, name: 'Sarah Chen', avatar: '/StaticImages/Designer4.jpg', role: 'Web Designer' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!isOpen || !designer) return null

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    }
    setMessages([...messages, userMessage])
    setNewMessage('')

    setIsLoading(true)
    setTimeout(() => {
      const designerResponse = {
        id: messages.length + 2,
        sender: 'designer',
        text: `I'd be happy to help with that. Can you tell me more about what you're looking for?`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, designerResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={`fixed bottom-0 right-0 z-50 bg-gray-900 border-l border-t border-gray-700 shadow-2xl transition-all duration-300 ease-out flex flex-col ${
      isMinimized ? 'h-16 w-80' : 'h-screen md:h-[600px] w-full md:w-96'
    }`}>
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={designer.avatar} 
            alt={designer.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-sm truncate">{designer.name}</h3>
              {!isMinimized && (
                <div className="relative">
                  <button
                    onClick={() => setShowConversationMenu(!showConversationMenu)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Switch conversation"
                  >
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {showConversationMenu && previousDesigners.length > 0 && (
                    <div className="absolute right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-52 z-20">
                      {previousDesigners.map((prev) => (
                        <button
                          key={prev.id}
                          onClick={() => {
                            setShowConversationMenu(false)
                            // Switch conversation (in real app, would load different messages)
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <img 
                              src={prev.avatar} 
                              alt={prev.name}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">{prev.name}</p>
                              <p className="text-xs text-gray-400 truncate">{prev.role}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {!isMinimized && <p className="text-xs text-gray-400">{designer.role}</p>}
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title={isMinimized ? 'Restore' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 size={18} className="text-gray-400" />
            ) : (
              <Minimize2 size={18} className="text-gray-400" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Close"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages - Hidden when minimized */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 px-4 py-3 rounded-xl rounded-bl-none border border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-3 flex gap-2 bg-gray-800 flex-shrink-0">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || newMessage.trim() === ''}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium"
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

