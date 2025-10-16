import React from 'react'
import { NavBar, Footer } from '../../LandingPage'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@heroui/button"
import { router } from '@inertiajs/react'

const companyProfilePackages = [
  {
    id: 1,
    name: "Basic Company Profile",
    price: "Rp 1.000.000",
    description: "Professional company profile website to establish your online presence.",
    image: "/StaticImages/BasicProfile.jpg",
    features: ["5 Pages", "About Us", "Services", "Contact Page", "Basic SEO"]
  },
  {
    id: 2,
    name: "Premium Corporate Profile", 
    price: "Rp 3.000.000",
    description: "Comprehensive corporate profile with advanced features.",
    image: "/StaticImages/PremiumProfile.jpeg",
    features: ["10+ Pages", "Team Section", "Portfolio", "Blog", "Advanced SEO", "Multilingual"]
  }
]

export default function CompanyProfilePage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
      
      <div className="w-full flex-1">
        <div className="py-8 px-8">
            <Button class="mb-5"
              onClick={() => router.visit('/products')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              ← Back to Products
            </Button>
          <div className="flex items-center gap-4 mb-4 mt-4">
            <h1 className="text-4xl font-extrabold text-white">Company Profile Design</h1>
          </div>
          <p className="text-gray-300">Professional company profiles to enhance your brand image</p>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyProfilePackages.map((packageItem) => (
              <Card key={packageItem.id} className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={packageItem.image} 
                    alt={packageItem.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/374151/FFFFFF?text=Profile+Preview'
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">{packageItem.name}</CardTitle>
                  <CardDescription className="text-gray-300">{packageItem.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {packageItem.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{packageItem.price}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button color="primary" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}