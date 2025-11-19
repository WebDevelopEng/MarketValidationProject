import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from '@inertiajs/react'
import { Button } from "@heroui/button"
export default function LeftAccountNavbar({position}){
    
    return (
        <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
            <CardTitle className="text-white">Account Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
            <div>
                {position=="profile"?<Link href='/account/profile'>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    Profile
                </Button>
                </Link>:<Link href='/account/profile'>
                <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                    Profile
                </Button>
                </Link>}
                
            </div>
            <div>
                {position=="orders"?<Link href='/account/orders'>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    Orders
                </Button>
                </Link>:
                <Link href='/account/orders'>
                <Button className="w-full justify-start bg-gray-700 hover:bg-gray-700 text-white">
                    Orders
                </Button>
                </Link>}
            </div>
            <div>
                {position=="assets"?<Link href='/account/assets'>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    Assets
                </Button>
                </Link>:<Link href='/account/assets'>
                <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                    Assets
                </Button>
                </Link>}
                
            </div>
            </CardContent>
            </Card>
    )



}