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

const customDesignServices = [
  {
    id: 1,
    name: "Basic Website Design",
    price: "Rp 500.000",
    description: "Custom website design for small businesses and personal projects.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    features: ["3 Pages", "Responsive Design", "Contact Form", "1 Revision"],
    delivery: "7-10 days"
  },
  {
    id: 2,
    name: "Advanced Web Application", 
    price: "Rp 2.500.000",
    description: "Complex web application with custom functionality.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    features: ["Custom Features", "Admin Dashboard", "User Authentication", "3 Revisions"],
    delivery: "3-4 weeks"
  }
]

export default function CustomDesignPage() {
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
            <h1 className="text-4xl font-extrabold text-white">Custom Design Services</h1>
          </div>
          <p className="text-gray-300">Tailored design solutions for your specific needs</p>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customDesignServices.map((service) => (
              <Card key={service.id} className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/374151/FFFFFF?text=Design+Preview'
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">{service.name}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="mb-4">
                    <h4 className="text-white text-sm font-semibold mb-2">Includes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-400">Delivery:</span>
                      <span className="text-white ml-2">{service.delivery}</span>
                    </div>
                    <span className="text-xl font-bold text-white">{service.price}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button color="primary" className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => router.visit('/products?category=custom-design')}
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