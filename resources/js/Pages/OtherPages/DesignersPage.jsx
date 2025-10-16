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

// Sample designers data
const designers = [
  {
    id: 1,
    name: "Tsas",
    role: "Senior UI/UX Designer",
    experience: "8+ years",
    specialization: ["UI/UX Design", "Web Design", "Mobile Apps", "User Research"],
    rating: 4.9,
    projectsCompleted: 127,
    bio: "Specialized in creating intuitive user experiences with beautiful interfaces that drive results.",
    hourlyRate: "Rp 350.000",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    avatar: "/StaticImages/Designer1.jpg"
  },
  {
    id: 2,
    name: "Willyanto",
    role: "Product Designer",
    experience: "6+ years",
    specialization: ["Product Design", "SaaS Products", "Dashboard Design", "UX Research"],
    rating: 4.8,
    projectsCompleted: 94,
    bio: "Passionate about solving complex problems through thoughtful design and user-centered approaches.",
    hourlyRate: "Rp 300.000",
    skills: ["Figma", "Prototyping", "User Testing", "Design Systems"],
    avatar: "/StaticImages/Designer2.jpg"
  },
  {
    id: 3,
    name: "Owen",
    role: "Brand Identity Designer",
    experience: "10+ years",
    specialization: ["Brand Identity", "Logo Design", "Brand Guidelines", "Print Design"],
    rating: 5.0,
    projectsCompleted: 156,
    bio: "Creating memorable brand identities that tell compelling stories and connect with audiences.",
    hourlyRate: "Rp 400.000",
    skills: ["Illustrator", "Photoshop", "InDesign", "Brand Strategy"],
    avatar: "/StaticImages/Designer3.jpg"
  },
  {
    id: 4,
    name: "Sarah Chen",
    role: "Web Designer",
    experience: "5+ years",
    specialization: ["Web Design", "E-commerce", "Responsive Design", "UI Design"],
    rating: 4.7,
    projectsCompleted: 89,
    bio: "Focused on creating responsive, accessible, and visually stunning digital experiences.",
    hourlyRate: "Rp 280.000",
    skills: ["Figma", "Webflow", "HTML/CSS", "Responsive Design"],
    avatar: "/StaticImages/Designer4.jpg"
  },
  {
    id: 5,
    name: "Mike Rodriguez",
    role: "Motion Designer",
    experience: "4+ years",
    specialization: ["Motion Design", "Animation", "Micro-interactions", "Mobile UI"],
    rating: 4.6,
    projectsCompleted: 67,
    bio: "Bringing interfaces to life with smooth animations and engaging interactions.",
    hourlyRate: "Rp 250.000",
    skills: ["After Effects", "Principle", "Framer", "Prototyping"],
    avatar: "/StaticImages/Designer 5.jpg"
  }
]

// Design specialties filter
const specialties = [
  "All Designers",
  "UI/UX Design",
  "Product Design", 
  "Brand Identity",
  "Web Design",
  "Motion Design"
]

// Map URL parameters to specialties
const urlToSpecialtyMap = {
  'ui-ux': 'UI/UX Design',
  'product': 'Product Design',
  'brand': 'Brand Identity', 
  'web': 'Web Design',
  'motion': 'Motion Design'
}

export default function DesignersPage() {
  // Get the filter from URL parameters
  const getInitialSpecialty = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const specialtyParam = urlParams.get('specialty')
      return urlToSpecialtyMap[specialtyParam] || "All Designers"
    }
    return "All Designers"
  }

  const [selectedSpecialty, setSelectedSpecialty] = React.useState(getInitialSpecialty())
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredDesigners = designers.filter(designer => {
    const searchLower = searchTerm.toLowerCase()
    
    const matchesSearch = 
      designer.name.toLowerCase().includes(searchLower) ||
      designer.role.toLowerCase().includes(searchLower) ||
      designer.specialization.some(spec => spec.toLowerCase().includes(searchLower)) ||
      designer.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
      designer.bio.toLowerCase().includes(searchLower)
    
    const matchesSpecialty = selectedSpecialty === "All Designers" || 
      designer.specialization.some(spec => spec === selectedSpecialty)
    
    return matchesSearch && matchesSpecialty
  })

  // Debug: Log the current filter
  React.useEffect(() => {
    console.log('Current specialty filter:', selectedSpecialty)
    console.log('Filtered designers count:', filteredDesigners.length)
  }, [selectedSpecialty, filteredDesigners])

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
      
      <div className="w-full flex-1">
        {/* Page Header */}
        <div className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">Our Designers</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {selectedSpecialty === "All Designers" 
                ? "Meet our talented team of creative professionals"
                : `Specialized in ${selectedSpecialty}`
              }
            </p>
            {/* Debug info*/}
            <div className="mt-2 text-sm text-gray-500">
              Active filter: {selectedSpecialty} | Showing {filteredDesigners.length} designers
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
                placeholder="Search designers by name, role, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Specialty Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSpecialty === specialty
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Designers Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigners.map((designer) => (
              <Card 
                key={designer.id} 
                className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm"
              >
                {/* Designer Avatar/Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={designer.avatar} 
                    alt={designer.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/StaticImages/Placeholder.png'
                    }}
                  />
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-white">{designer.name}</CardTitle>
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                      {designer.role}
                    </span>
                  </div>
                  <CardDescription className="text-gray-300 text-sm">
                    {designer.bio}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  {/* Designer Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Experience:</span>
                      <span className="text-white">{designer.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-yellow-400">⭐ {designer.rating}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Projects:</span>
                      <span className="text-white">{designer.projectsCompleted}+</span>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-2">Specialization:</h4>
                    <div className="flex flex-wrap gap-1">
                      {designer.specialization.map((spec, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {designer.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded border border-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{designer.hourlyRate}</span>
                    <span className="text-gray-400 text-sm">/ hour</span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button color="primary" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    View Portfolio
                  </Button>
                  <Button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600">
                    Contact
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredDesigners.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No designers found matching your criteria.</div>
              <Button 
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSpecialty("All Designers")
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