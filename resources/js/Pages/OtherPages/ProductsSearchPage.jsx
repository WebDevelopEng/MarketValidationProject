import React, { useState, useEffect } from 'react'
import { NavBar, Footer } from '../LandingPage'
import { router } from '@inertiajs/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@heroui/button"
import { addToCart } from '@/lib/cart'
import { useToast } from '@/components/Toast'

// Sample products data
const allProducts = [
  {
    id: 1,
    name: "E-commerce Template",
    category: "templates",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
    description: "Complete online store template with product pages and cart functionality.",
    features: ["Responsive Design", "Product Gallery", "Shopping Cart", "Checkout Page"],
    revisions: 3,
    complexity: "basic",
    deliveryDays: 2
  },
  {
    id: 2,
    name: "Portfolio Template",
    category: "templates",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1559028615-cd4628902d4a?w=400&h=300&fit=crop",
    description: "Elegant portfolio template for creatives and professionals.",
    features: ["Project Showcase", "About Page", "Contact Form", "Blog Layout"],
    revisions: 2,
    complexity: "basic",
    deliveryDays: 1
  },
  {
    id: 3,
    name: "Corporate Business Template",
    category: "templates",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    description: "Professional template for corporate websites and businesses.",
    features: ["Service Pages", "Team Section", "Testimonials", "Pricing Tables"],
    revisions: 4,
    complexity: "basic",
    deliveryDays: 2
  },
  {
    id: 4,
    name: "Basic Website Design",
    category: "custom-design",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    description: "Custom website design for small businesses and personal projects.",
    features: ["3 Pages", "Responsive Design", "Contact Form", "1 Revision"],
    revisions: 1,
    complexity: "basic",
    deliveryDays: 7
  },
  {
    id: 5,
    name: "Advanced Web Application",
    category: "custom-design",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    description: "Complex web application with custom functionality.",
    features: ["Custom Features", "Admin Dashboard", "User Authentication", "3 Revisions"],
    revisions: 3,
    complexity: "advanced",
    deliveryDays: 21
  },
  {
    id: 6,
    name: "Corporate Profile - Basic",
    category: "corporate-profile",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
    description: "Professional company profile design for corporate identity.",
    features: ["Company Info", "Services", "Team Page", "Contact"],
    revisions: 4,
    tier: "basic",
    complexity: "basic",
    deliveryDays: 5
  },
  {
    id: 7,
    name: "Corporate Profile - Premium",
    category: "corporate-profile",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    description: "Premium company profile with advanced features and customization.",
    features: ["Advanced Analytics", "E-commerce Integration", "Testimonials", "Blog"],
    revisions: 5,
    tier: "premium",
    complexity: "advanced",
    deliveryDays: 14
  },
  {
    id: 8,
    name: "Enterprise Solution",
    category: "enterprise-solution",
    price: 4999.99,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    description: "Complete enterprise-grade design solution for large businesses.",
    features: ["Custom Design System", "Multiple Pages", "Brand Guidelines", "Ongoing Support"],
    revisions: 10,
    complexity: "advanced",
    deliveryDays: 28
  },
  {
    id: 9,
    name: "E-commerce Platform",
    category: "ecommerce-platform",
    price: 2999.99,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    description: "Full e-commerce platform design with shopping cart and payment integration.",
    features: ["Product Management", "Shopping Cart", "Payment Gateway", "Order Tracking"],
    revisions: 8,
    complexity: "advanced",
    deliveryDays: 21
  },
]

// Price presets
const pricePresets = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000 - $5000", min: 1000, max: 5000 },
  { label: "Over $5000", min: 5000, max: Infinity },
]

// Revision presets
const revisionPresets = [
  { label: "1-2 revisions", min: 1, max: 2 },
  { label: "3-5 revisions", min: 3, max: 5 },
  { label: "5+ revisions", min: 5, max: Infinity },
]

// Time presets (in days)
const timePresets = [
  { label: "1-3 days", min: 1, max: 3 },
  { label: "1-2 weeks", min: 7, max: 14 },
  { label: "2-4 weeks", min: 14, max: 28 },
  { label: "1+ months", min: 30, max: Infinity },
]

export default function ProductsSearchPage() {
  const { toast, showToast, ToastComponent } = useToast()
  
  // Filters state
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCorporateTier, setSelectedCorporateTier] = useState([])
  const [selectedComplexity, setSelectedComplexity] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })
  const [revisionRange, setRevisionRange] = useState({ min: 0, max: Infinity })
  const [timeRange, setTimeRange] = useState({ min: 0, max: Infinity })
  const [customMinPrice, setCustomMinPrice] = useState('')
  const [customMaxPrice, setCustomMaxPrice] = useState('')
  const [customMinRevisions, setCustomMinRevisions] = useState('')
  const [customMaxRevisions, setCustomMaxRevisions] = useState('')
  const [customMinTime, setCustomMinTime] = useState('')
  const [customMaxTime, setCustomMaxTime] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Toggle category filter
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  // Toggle complexity
  const toggleComplexity = (comp) => {
    setSelectedComplexity(prev =>
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    )
  }

  // Apply custom price range
  const applyCustomPrice = () => {
    const min = customMinPrice ? parseFloat(customMinPrice) : 0
    const max = customMaxPrice ? parseFloat(customMaxPrice) : Infinity
    if (min >= 0 && max >= min) {
      setPriceRange({ min, max })
      setCustomMinPrice('')
      setCustomMaxPrice('')
    }
  }

  // Apply custom revision range
  const applyCustomRevisions = () => {
    const min = customMinRevisions ? parseFloat(customMinRevisions) : 0
    const max = customMaxRevisions ? parseFloat(customMaxRevisions) : Infinity
    if (min >= 0 && max >= min) {
      setRevisionRange({ min, max })
      setCustomMinRevisions('')
      setCustomMaxRevisions('')
    }
  }

  // Apply custom time range
  const applyCustomTime = () => {
    const min = customMinTime ? parseFloat(customMinTime) : 0
    const max = customMaxTime ? parseFloat(customMaxTime) : Infinity
    if (min >= 0 && max >= min) {
      setTimeRange({ min, max })
      setCustomMinTime('')
      setCustomMaxTime('')
    }
  }

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    
    const matchesTier = selectedCorporateTier.length === 0 || 
      product.category !== 'corporate-profile' ||
      selectedCorporateTier.includes(product.tier)

    const matchesComplexity = selectedComplexity.length === 0 ||
      selectedComplexity.includes(product.complexity)

    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    const matchesRevisions = product.revisions >= revisionRange.min && product.revisions <= revisionRange.max
    const matchesTime = product.deliveryDays >= timeRange.min && product.deliveryDays <= timeRange.max

    return matchesSearch && matchesCategory && matchesTier && matchesComplexity && matchesPrice && matchesRevisions && matchesTime
  })

  const handleAddToCart = (product) => {
    addToCart({
      id: `product-${product.id}`,
      title: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      image: product.image
    })
    showToast('Item added to cart!')
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedCorporateTier([])
    setSelectedComplexity([])
    setPriceRange({ min: 0, max: Infinity })
    setRevisionRange({ min: 0, max: Infinity })
    setTimeRange({ min: 0, max: Infinity })
    setSearchTerm('')
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />

      <div className="w-full flex-1">
        {/* Page Header */}
        <div className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">Products & Services</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find the perfect design product or service for your needs
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0 h-fit">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Search</h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === 0}
                      onChange={() => setSelectedCategories([])}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300 hover:text-white font-medium">Any</span>
                  </label>
                  {[
                    { value: 'templates', label: 'Templates' },
                    { value: 'custom-design', label: 'Custom Design' },
                    { value: 'corporate-profile', label: 'Corporate Profile' },
                    { value: 'enterprise-solution', label: 'Enterprise Solution' },
                    { value: 'ecommerce-platform', label: 'E-commerce Platform' },
                    { value: 'portfolio', label: 'Portfolio' },
                  ].map(cat => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.value)}
                        onChange={() => toggleCategory(cat.value)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-gray-300 hover:text-white">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Corporate Tier (conditional) */}
              {selectedCategories.includes('corporate-profile') && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Corporate Tier</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCorporateTier.length === 0}
                        onChange={() => setSelectedCorporateTier([])}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-gray-300 hover:text-white font-medium">Any</span>
                    </label>
                    {['basic', 'premium'].map(tier => (
                      <label key={tier} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCorporateTier.includes(tier)}
                          onChange={() => toggleCorporateTier(tier)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-gray-300 hover:text-white capitalize">{tier}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Complexity */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Complexity</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedComplexity.length === 0}
                      onChange={() => setSelectedComplexity([])}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300 hover:text-white font-medium">Any</span>
                  </label>
                  {['basic', 'advanced'].map(comp => (
                    <label key={comp} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedComplexity.includes(comp)}
                        onChange={() => toggleComplexity(comp)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-gray-300 hover:text-white capitalize">{comp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pricePreset"
                      checked={priceRange.min === 0 && priceRange.max === Infinity}
                      onChange={() => setPriceRange({ min: 0, max: Infinity })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300 hover:text-white font-medium">Any</span>
                  </label>
                  {pricePresets.map(preset => (
                    <label key={preset.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pricePreset"
                        checked={priceRange.min === preset.min && priceRange.max === preset.max}
                        onChange={() => setPriceRange({ min: preset.min, max: preset.max })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300 hover:text-white">{preset.label}</span>
                    </label>
                  ))}
                  <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                    <label className="text-sm text-gray-400">Custom Range:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={customMinPrice}
                        onChange={(e) => setCustomMinPrice(e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={customMaxPrice}
                        onChange={(e) => setCustomMaxPrice(e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                      />
                      <button
                        onClick={applyCustomPrice}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revision Range */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Revisions</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="revisionPreset"
                      checked={revisionRange.min === 0 && revisionRange.max === Infinity}
                      onChange={() => setRevisionRange({ min: 0, max: Infinity })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300 hover:text-white font-medium">Any</span>
                  </label>
                  {revisionPresets.map(preset => (
                    <label key={preset.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="revisionPreset"
                        checked={revisionRange.min === preset.min && revisionRange.max === preset.max}
                        onChange={() => setRevisionRange({ min: preset.min, max: preset.max })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300 hover:text-white">{preset.label}</span>
                    </label>
                  ))}
                  <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                    <label className="text-sm text-gray-400">Custom Range:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={customMinRevisions}
                        onChange={(e) => setCustomMinRevisions(e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={customMaxRevisions}
                        onChange={(e) => setCustomMaxRevisions(e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                      />
                      <button
                        onClick={applyCustomRevisions}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Range */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Delivery Time</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timePreset"
                      checked={timeRange.min === 0 && timeRange.max === Infinity}
                      onChange={() => setTimeRange({ min: 0, max: Infinity })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300 hover:text-white font-medium">Any</span>
                  </label>
                  {timePresets.map(preset => (
                    <label key={preset.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="timePreset"
                        checked={timeRange.min === preset.min && timeRange.max === preset.max}
                        onChange={() => setTimeRange({ min: preset.min, max: preset.max })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300 hover:text-white">{preset.label}</span>
                    </label>
                  ))}
                  <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                    <label className="text-sm text-gray-400">Custom Range (days):</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={customMinTime}
                        onChange={(e) => setCustomMinTime(e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={customMaxTime}
                        onChange={(e) => setCustomMaxTime(e.target.value)}
                        className="w-20 px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-sm"
                      />
                      <button
                        onClick={applyCustomTime}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-400">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">No products found matching your filters.</div>
                <Button
                  onClick={clearAllFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card
                    key={product.id}
                    className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm"
                  >
                    {/* Product Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => e.target.src = '/StaticImages/Placeholder.png'}
                      />
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">{product.name}</CardTitle>
                      <CardDescription className="text-gray-300 text-sm">
                        {product.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-400">${product.price.toFixed(2)}</span>
                          <span className="text-sm text-gray-400">{product.revisions} revisions</span>
                        </div>
                        {product.tier && (
                          <div className="px-3 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full inline-block capitalize">
                            {product.tier}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      {ToastComponent}
    </div>
  )
}
