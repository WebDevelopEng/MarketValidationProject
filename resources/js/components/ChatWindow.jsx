import React, { useState, useRef, useEffect } from 'react'
import { X, Send, ChevronDown, Minimize2, Maximize2 } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { normalizeImage } from '@/lib/image'

export default function ChatWindow({ isOpen, onClose, designer }) {
  const { account } = usePage().props
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showConversationMenu, setShowConversationMenu] = useState(false)
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const messagesEndRef = useRef(null)

  // Load conversations on mount
  useEffect(() => {
    if (isOpen && account) {
      loadConversations()
    }
  }, [isOpen, account])

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId)
    }
  }, [currentConversationId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/conversations')
      const data = await response.json()
      setConversations(data)
      
      // Find or create conversation with current designer
      if (designer) {
        const existingConvo = data.find(c => 
          (c.recipient.id === designer.id)
        )
        if (existingConvo) {
          setCurrentConversationId(existingConvo.id)
        }
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
    }
  }

  const loadMessages = async (conversationId) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`)
      const data = await response.json()
      setMessages(data.reverse())
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  if (!isOpen || !designer) return null

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return

    // Optimistic update
    const tempMessage = {
      id: Date.now(),
      sender: account.id,
      content: newMessage,
      created_at: new Date().toISOString()
    }
    setMessages([...messages, tempMessage])
    setNewMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
        },
        body: JSON.stringify({
          recipient_id: designer.id,
          content: newMessage
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Update with actual message from server
        setMessages(prev => 
          prev.map(msg => msg.id === tempMessage.id ? data.message : msg)
        )
        
        // Update current conversation ID if new
        if (!currentConversationId) {
          setCurrentConversationId(data.conversation_id)
        }
        
        // Reload conversations to update list
        loadConversations()
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`fixed bottom-0 right-0 z-50 bg-gray-900 border-l border-t border-gray-700 shadow-2xl transition-all duration-300 ease-out flex flex-col ${
      isMinimized ? 'h-16 w-80' : 'h-screen md:h-[600px] w-full md:w-96'
    }`}>
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img 
            src={normalizeImage(designer.image) || designer.avatar} 
            alt={designer.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-sm truncate">{designer.name}</h3>
              {!isMinimized && conversations.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowConversationMenu(!showConversationMenu)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Switch conversation"
                  >
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  
                  {showConversationMenu && conversations.length > 0 && (
                    <div className="absolute right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-52 z-20">
                      {conversations.map((convo) => (
                        <button
                          key={convo.id}
                          onClick={() => {
                            setCurrentConversationId(convo.id)
                            setShowConversationMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <img 
                              src={normalizeImage(convo.recipient.image) || '/StaticImages/Placeholder.png'} 
                              alt={convo.recipient.name}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">{convo.recipient.name}</p>
                              <p className="text-xs text-gray-400 truncate">{convo.last_message?.content}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {!isMinimized && <p className="text-xs text-gray-400">{designer.role || 'Designer'}</p>}
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
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Start a conversation...
              </div>
            )}
            {messages.map((message) => {
              const isMe = String(message.sender) === String(account?.id)
              return (
                <div
                  key={message.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-2 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )
            })}
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

