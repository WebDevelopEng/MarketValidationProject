import React, { useState } from 'react'
import { NavBar, Footer } from '../LandingPage'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Search } from 'lucide-react'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample conversations
  const conversations = [
    {
      id: 1,
      designer: { name: 'Tsas', avatar: '/StaticImages/Designer1.jpg', role: 'Senior UI/UX Designer' },
      unread: 2,
      lastMessage: 'That sounds great! Let me prepare a proposal...',
      timestamp: '2 hours ago',
      messages: [
        { id: 1, sender: 'designer', text: 'Hi! How can I help you with your design project?', timestamp: new Date(Date.now() - 24 * 60 * 60000) },
        { id: 2, sender: 'user', text: 'I need a modern website redesign for my e-commerce store', timestamp: new Date(Date.now() - 23 * 60 * 60000) },
        { id: 3, sender: 'designer', text: 'That sounds great! Let me prepare a proposal...', timestamp: new Date(Date.now() - 2 * 60 * 60000) }
      ]
    },
    {
      id: 2,
      designer: { name: 'Owen', avatar: '/StaticImages/Designer3.jpg', role: 'Brand Identity Designer' },
      unread: 0,
      lastMessage: 'When can we schedule a call?',
      timestamp: 'Yesterday',
      messages: [
        { id: 1, sender: 'user', text: 'I need help with my brand identity', timestamp: new Date(Date.now() - 48 * 60 * 60000) },
        { id: 2, sender: 'designer', text: 'I can definitely help with that!', timestamp: new Date(Date.now() - 47 * 60 * 60000) },
        { id: 3, sender: 'designer', text: 'When can we schedule a call?', timestamp: new Date(Date.now() - 24 * 60 * 60000) }
      ]
    },
    {
      id: 3,
      designer: { name: 'Sarah Chen', avatar: '/StaticImages/Designer4.jpg', role: 'Web Designer' },
      unread: 0,
      lastMessage: 'Looking forward to working with you',
      timestamp: '3 days ago',
      messages: [
        { id: 1, sender: 'designer', text: 'Project looks interesting!', timestamp: new Date(Date.now() - 72 * 60 * 60000) },
        { id: 2, sender: 'user', text: 'Great! Lets discuss the details', timestamp: new Date(Date.now() - 71 * 60 * 60000) },
        { id: 3, sender: 'designer', text: 'Looking forward to working with you', timestamp: new Date(Date.now() - 72 * 60 * 60000) }
      ]
    }
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.designer.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const current = conversations[selectedConversation]

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return

    const updatedConversations = [...conversations]
    updatedConversations[selectedConversation].messages.push({
      id: current.messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    })
    setNewMessage('')
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
            {filteredConversations.map((conv, idx) => (
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
                    src={conv.designer.avatar}
                    alt={conv.designer.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-white font-semibold text-sm">{conv.designer.name}</h4>
                      <span className="text-gray-500 text-xs whitespace-nowrap">{conv.timestamp}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{conv.designer.role}</p>
                    <p className="text-gray-400 text-sm truncate mt-1">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <div className="mt-2 inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {conv.unread} new
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-900 border-l border-gray-700">
          {/* Header */}
          <div className="border-b border-gray-700 p-6 flex-shrink-0 bg-gray-800">
            <div className="flex items-center gap-4">
              <img
                src={current.designer.avatar}
                alt={current.designer.name}
                className="w-14 h-14 rounded-full object-cover"
                onError={(e) => (e.target.src = '/StaticImages/Placeholder.png')}
              />
              <div>
                <h3 className="text-lg font-bold text-white">{current.designer.name}</h3>
                <p className="text-sm text-gray-400">{current.designer.role}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {current.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm px-4 py-3 rounded-xl ${
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
        </div>
      </div>

      <Footer />
    </div>
  )
}

