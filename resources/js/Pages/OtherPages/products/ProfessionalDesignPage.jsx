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

const professionalServices = [
  {
    id: 1,
    name: "Enterprise Solution",
    price: "Rp 5.000.000",
    description: "Complete enterprise-grade design solution for large businesses.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    features: ["Custom Design System", "Multiple Pages", "Brand Guidelines", "Ongoing Support"]
  },
  {
    id: 2,
    name: "E-commerce Platform", 
    price: "Rp 8.000.000",
    description: "Full e-commerce platform design with shopping cart and payment integration.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    features: ["Product Management", "Shopping Cart", "Payment Gateway", "Order Tracking"]
  }
]

export default function ProfessionalDesignPage() {
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
            <h1 className="text-4xl font-extrabold text-white">Professional Custom Design</h1>
          </div>
          <p className="text-gray-300">Tailored design solutions for businesses seeking a unique and polished look</p>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalServices.map((service) => (
              <Card key={service.id} className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)] transition-all duration-300 border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/374151/FFFFFF?text=Professional+Design'
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
                        <span key={index} className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">{service.price}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button color="primary" className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => router.visit('/products?category=enterprise-solution')}
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