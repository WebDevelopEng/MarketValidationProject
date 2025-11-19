import React, { useState } from 'react'
import { X, Star, Award, Eye } from 'lucide-react'

export default function PortfolioModal({ isOpen, onClose, product }) {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0)

  if (!isOpen || !product) return null

  // Sample portfolio data (in production would come from product/designer data)
  const portfolio = {
    designer: product.designer || 'Alex Johnson',
    title: product.title || 'Creative Designer',
    rating: 4.8,
    reviews: 127,
    projects: 45,
    bio: 'Award-winning designer with 10+ years of experience in creating stunning digital experiences. Specialized in modern UI/UX design, web design, and brand identity.',
    works: [
      { id: 1, title: 'E-Commerce Platform Redesign', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', category: 'Web Design' },
      { id: 2, title: 'Mobile App UI Kit', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', category: 'UI Design' },
      { id: 3, title: 'Brand Identity Package', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop', category: 'Branding' },
      { id: 4, title: 'Website Mockup Design', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', category: 'Web Design' },
    ],
    testimonials: [
      { name: 'Sarah M.', text: 'Excellent work! Professional and timely delivery.' },
      { name: 'Mike K.', text: 'Best designer I\'ve worked with. Highly recommended!' },
    ]
  }

  const nextWork = () => {
    setCurrentWorkIndex((prev) => (prev + 1) % portfolio.works.length)
  }

  const prevWork = () => {
    setCurrentWorkIndex((prev) => (prev - 1 + portfolio.works.length) % portfolio.works.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in scale-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-gray-400 hover:text-white" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Designer Header */}
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-gray-700">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{portfolio.designer}</h2>
              <p className="text-gray-400 mb-4">{portfolio.bio}</p>
              
              {/* Stats */}
              <div className="flex gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-400" />
                  <span className="text-white font-semibold">{portfolio.rating}</span>
                  <span className="text-gray-400">({portfolio.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-blue-400" />
                  <span className="text-white font-semibold">{portfolio.projects}</span>
                  <span className="text-gray-400">Projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Work */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Featured Work</h3>
            <div className="relative">
              <div className="overflow-hidden rounded-lg bg-gray-800 aspect-video">
                <img
                  src={portfolio.works[currentWorkIndex].image}
                  alt={portfolio.works[currentWorkIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Work Title and Category */}
              <div className="mt-3 flex justify-between items-start">
                <div>
                  <p className="text-white font-semibold">{portfolio.works[currentWorkIndex].title}</p>
                  <p className="text-gray-400 text-sm">{portfolio.works[currentWorkIndex].category}</p>
                </div>
                <div className="text-gray-400 text-sm">{currentWorkIndex + 1} / {portfolio.works.length}</div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={prevWork}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextWork}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Work Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">All Works</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {portfolio.works.map((work, idx) => (
                <div
                  key={work.id}
                  onClick={() => setCurrentWorkIndex(idx)}
                  className={`relative overflow-hidden rounded-lg cursor-pointer aspect-square transition-all duration-200 ${
                    idx === currentWorkIndex ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
                  }`}
                >
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye size={24} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Client Testimonials</h3>
            <div className="space-y-3">
              {portfolio.testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">"{testimonial.text}"</p>
                  <p className="text-gray-400 text-sm font-semibold">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold">
              Contact Designer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
