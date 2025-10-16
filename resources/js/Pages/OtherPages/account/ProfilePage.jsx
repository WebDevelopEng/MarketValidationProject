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
import { Link } from '@inertiajs/react'
export default function AccountProfilePage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
      
      <div className="w-full flex-1">
        {/* Page Header */}
        <div className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">Account Profile</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-1">
            <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
            <CardTitle className="text-white">Account Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
            <div>
                <Link href='/account/profile'>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                    Profile
                </Button>
                </Link>
            </div>
            <div>
                <Link href='/account/orders'>
                <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                    Orders
                </Button>
                </Link>
            </div>
            <div>
                <Link href='/account/settings'>
                <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                    Settings
                </Button>
                </Link>
            </div>
            </CardContent>
            </Card>
            </div>

            {/* Main Content - Profile Info */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-300">
                    Update your personal information and profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl text-gray-400">👤</span>
                    </div>
                    <div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white mr-3">
                        Upload Photo
                      </Button>
                      <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Bio
                    </label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, Country"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}