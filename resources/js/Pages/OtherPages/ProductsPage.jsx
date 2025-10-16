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
import { router } from '@inertiajs/react'

const products = [
  {
    id: 1,
    name: "Website Templates",
    price: "Rp 200.000 - Rp 2.000.000",
    description: "High-quality, customizable website templates for various industries.",
    image: "/StaticImages/Placeholder.png",
    route: "website-templates"
  },
  {
    id: 2,
    name: "Basic Custom Design", 
    price: "Rp 500.000 - Rp 5.000.000",
    description: "Affordable custom design services for small businesses and personal projects.",
    image: "/StaticImages/Placeholder.png",
    route: "custom-design"
  },
  {
    id: 3,
    name: "Company Profile Design",
    price: "Rp 1.000.000 - Rp 10.000.000", 
    description: "Professional company profile designs to enhance your brand image.",
    image: "/StaticImages/Placeholder.png",
    route: "company-profile"
  },
  {
    id: 4,
    name: "Professional Custom Design",
    price: "Rp 2.000.000 - Rp 20.000.000",
    description: "Tailored design solutions for businesses seeking a unique and polished look.",
    image: "/StaticImages/Placeholder.png",
    route: "professional-design"
  },
]

export default function ProductsPage(){
    const handleBrowse = (productRoute) => {
        router.visit(`/products/${productRoute}`)
    }

    return(
        <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <NavBar/>
            
            <div className="w-full flex-1">
                <div className="py-8 ms-8">
                    <h1 className="text-4xl font-extrabold text-white">Products</h1>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="rounded-lg overflow-hidden hover:shadow-[0_8px_30px_rgb(200,200,255,0.32)] transition-all duration-300 border border-gray-700 bg-gray-800">
                                <div className="aspect-square overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                                    />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl text-white">{product.name}</CardTitle>
                                    <CardDescription className="text-gray-300">{product.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-white">{product.price}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button 
                                        color="primary" 
                                        className="w-full"
                                        onClick={() => handleBrowse(product.route)}
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