import React, { useState, useEffect } from 'react'
import { NavBar, Footer } from '../LandingPage'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Search } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { normalizeImage } from '@/lib/image'

export default function MessagesPage() {
  const { account } = usePage().props
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load conversations from backend on mount
  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/conversations')
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
        if (data.length > 0) {
          setSelectedConversation(0)
        }
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
      // Fallback to sample data if API fails
      setConversations([
        {
          id: 1,
          recipient: { id: 1, name: 'Tsas', image: '/StaticImages/Designer1.jpg' },
          messages: [
            { id: 1, sender: account.id + 1, content: 'Hi! How can I help you?', created_at: new Date() }
          ]
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const current = filteredConversations[selectedConversation]

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !current) return

    try {
      // Optimistic update
      const tempMessage = {
        id: Date.now(),
        sender: account.id,
        content: newMessage,
        created_at: new Date()
      }

      setConversations(prev => {
        const updated = [...prev]
        const convoIndex = updated.findIndex(c => c.id === current.id)
        if (convoIndex >= 0) {
          updated[convoIndex] = {
            ...updated[convoIndex],
            messages: [...(updated[convoIndex].messages || []), tempMessage]
          }
        }
        return updated
      })

      setNewMessage('')

      // Send to backend
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
        },
        body: JSON.stringify({
          recipient_id: current.recipient.id,
          content: newMessage
        })
      })

      if (!response.ok) {
        console.error('Failed to send message')
        // Revert optimistic update on error
        setConversations(prev => {
          const updated = [...prev]
          const convoIndex = updated.findIndex(c => c.id === current.id)
          if (convoIndex >= 0) {
            updated[convoIndex] = {
              ...updated[convoIndex],
              messages: updated[convoIndex].messages.filter(m => m.id !== tempMessage.id)
            }
          }
          return updated
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Conversations List */}
        <div className="w-80 flex-shrink-0 border-r border-gray-700 bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex-shrink-0">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search designers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-gray-400 text-center">Loading conversations...</div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">No conversations yet</div>
            ) : (
              filteredConversations.map((conv, idx) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(idx)}
                  className={`w-full px-4 py-3 border-b border-gray-700 text-left transition-colors hover:bg-gray-800 ${
                    selectedConversation === idx
                      ? 'bg-gray-800 border-l-4 border-l-blue-500'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={normalizeImage(conv.recipient.image) || '/StaticImages/Placeholder.png'}
                      alt={conv.recipient.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-white font-semibold text-sm">{conv.recipient.name}</h4>
                      </div>
                      <p className="text-gray-400 text-sm truncate mt-1">
                        {conv.last_message?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-900 border-l border-gray-700">
          {current ? (
            <>
              {/* Header */}
              <div className="border-b border-gray-700 p-6 flex-shrink-0 bg-gray-800">
                <div className="flex items-center gap-4">
                  <img
                    src={normalizeImage(current.recipient.image) || '/StaticImages/Placeholder.png'}
                    alt={current.recipient.name}
                    className="w-14 h-14 rounded-full object-cover"
                    onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{current.recipient.name}</h3>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {!current.messages || current.messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Start a conversation...
                  </div>
                ) : (
                  current.messages.map((message) => {
                    const isMe = String(message.sender) === String(account?.id)
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-sm px-4 py-3 rounded-xl ${
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
                  })
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-700 p-6 flex-shrink-0 bg-gray-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ''}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-4">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

