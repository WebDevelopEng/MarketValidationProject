import React from 'react'
import { NavBar, Footer } from '../LandingPage'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@heroui/button"
import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'


// Sample assets data
const references = [
  {
    id: 8,
    name: "Photo Pack - Urban Landscape",
    type: "Photography",
    price: "Rp 180.000",
    description: "High-quality urban landscape photographs for commercial use.",
    image: "/StaticImages/PhotoPack1.jpg",
    category: "Photography",
    fileFormat: "JPG",
    fileSize: "200 MB",
    tags: ["Photography", "Urban", "Landscape", "High-Res"],
    includes: ["25 Photos", "4K Resolution", "Commercial License", "Multiple Angles"],
    license: "Commercial"
  }
]

// Asset categories for filtering
const categories = [
  "All Assets",
  "UI Kits",
  "Icons",
  "Illustrations",
  "Fonts",
  "Mockups",
  "Textures",
  "3D Assets",
  "Photography"
]
// License types
const licenses = [
  "Mit License",
  "GNU General Public License (GPL)",
  "Apache License 2.0",
  "BSD Licenses"
]

// Map URL parameters to categories
const urlToCategoryMap = {
  'ui-kits': 'UI Kits',
  'icons': 'Icons', 
  'fonts': 'Fonts',
  'illustrations': 'Illustrations',
  'mockups': 'Mockups',
  'textures': 'Textures',
  '3d': '3D Assets',
  'photos': 'Photography'
}

export default function AssetsPage() {
  const {assets}=usePage().props
  // Get the category from URL parameters
  const getInitialCategory = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const categoryParam = urlParams.get('category')
      return urlToCategoryMap[categoryParam] || "All Assets"
    }
    return "All Assets"
  }

  const [selectedCategory, setSelectedCategory] = React.useState(getInitialCategory())
  const [selectedLicense, setSelectedLicense] = React.useState("All Licenses")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortBy, setSortBy] = React.useState("name")

  const filteredAssets = assets.filter(asset => {
    const searchLower = searchTerm.toLowerCase()
    
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchLower) ||
      asset.description.toLowerCase().includes(searchLower) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      asset.type.toLowerCase().includes(searchLower)
    
    const matchesCategory = selectedCategory === "All Assets" || 
      asset.category === selectedCategory
    
    const matchesLicense = selectedLicense === "All Licenses" || 
      asset.license === selectedLicense
    
    return matchesSearch && matchesCategory && matchesLicense
  }).sort((a, b) => {
    switch (sortBy) {
      case "price":
        return extractPrice(a.price) - extractPrice(b.price)
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  // Helper function to extract numeric price for sorting
  function extractPrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, ''))
  }

  // Debug: Log the current filter
  React.useEffect(() => {
    console.log('Current category filter:', selectedCategory)
    console.log('Filtered assets count:', filteredAssets.length)
  }, [selectedCategory, filteredAssets])

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
      
      <div className="w-full flex-1">
        {/* Page Header */}
        <div className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">Design Assets</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {selectedCategory === "All Assets" 
                ? "Premium design resources to accelerate your creative workflow"
                : `${selectedCategory} - Professional design resources`
              }
            </p>
            {/* Debug info - you can remove this later */}
            <div className="mt-2 text-sm text-gray-500">
              Active category: {selectedCategory} | Showing {filteredAssets.length} assets
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 mb-8">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search assets by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-white font-medium mr-2">Category:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* License Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-white font-medium mr-2">License:</span>
                {licenses.map((license) => (
                  <button
                    key={license}
                    onClick={() => setSelectedLicense(license)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedLicense === license
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {license}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => (
              
              <Card 
                key={asset.id} 
                className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm"
              >
                {/* Asset Image */}
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={`/storage/${asset.images[0].filepath}`} 
                    alt={asset.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200/374151/FFFFFF?text=Asset+Preview'
                    }}
                  />
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-white">{asset.name}</CardTitle>
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                      {asset.category}
                    </span>
                  </div>
                  <CardDescription className="text-gray-300 text-sm">
                    {asset.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  {/* Asset Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Format:</span>
                      <span className="text-white">{asset.format}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Size:</span>
                      <span className="text-white">{asset.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">License:</span>
                      <span className="text-green-400">{asset.license}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {asset.tags?.split(",")?.map((format, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded border border-gray-600"
                        >
                          {format}
                        </span>
                      ))}
                      {asset.tags?.split(",").length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                          +{asset.tags?.split(",").length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{asset.price}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button color="primary" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    Preview
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <Link href={`/asset/${asset.id}/purchase`}>Purchase</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAssets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No assets found matching your criteria.</div>
              <Button 
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Assets")
                  setSelectedLicense("All Licenses")
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}