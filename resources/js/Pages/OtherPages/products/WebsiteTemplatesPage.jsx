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

const websiteTemplates = [
  {
    id: 1,
    name: "E-commerce Template",
    price: "Rp 200.000",
    description: "Complete online store template with product pages and cart functionality.",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
    category: "E-commerce",
    features: ["Responsive Design", "Product Gallery", "Shopping Cart", "Checkout Page"]
  },
  {
    id: 2,
    name: "Portfolio Template", 
    price: "Rp 150.000",
    description: "Elegant portfolio template for creatives and professionals.",
    image: "https://images.unsplash.com/photo-1559028615-cd4628902d4a?w=400&h=300&fit=crop",
    category: "Portfolio", 
    features: ["Project Showcase", "About Page", "Contact Form", "Blog Layout"]
  },
  {
    id: 3,
    name: "Corporate Business Template",
    price: "Rp 300.000",
    description: "Professional template for corporate websites and businesses.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    category: "Business",
    features: ["Service Pages", "Team Section", "Testimonials", "Pricing Tables"]
  }
]

export default function WebsiteTemplatesPage() {
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
            <h1 className="text-4xl font-extrabold text-white">Website Templates</h1>
          </div>
          <p className="text-gray-300">Choose from our collection of professional templates</p>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteTemplates.map((template) => (
              <Card key={template.id} className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/374151/FFFFFF?text=Template+Preview'
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">{template.name}</CardTitle>
                  <CardDescription className="text-gray-300">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{template.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button color="primary" className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => router.visit('/products?category=templates')}
                  >
                    Browse
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