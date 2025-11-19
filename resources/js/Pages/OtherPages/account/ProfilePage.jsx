import React, { useState, useEffect } from 'react'
import { NavBar, Footer } from '../../LandingPage'
import { router } from '@inertiajs/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LeftAccountNavbar from './LeftAccountNavbar'
import { Button } from "@heroui/button"
import { Link, usePage, Form } from '@inertiajs/react'
import Input from "@/components/ui/input"
import DefaultAvatar from '@/components/DefaultAvatar'
export default function AccountProfilePage() {
  const {account,profileimage}=usePage().props
  const {errors}=usePage().props
  const [previewImage, setPreviewImage] = useState(profileimage || null)
  const fileInputRef = React.useRef(null)

  useEffect(() => {
    if (!profileimage) {
      setPreviewImage(null)
      return
    }
    let url = profileimage
    if (typeof url === 'string') {
      if (url.startsWith('data:') || url.startsWith('http') || url.startsWith('/')) {
        // already usable
      } else {
        // filename stored in DB -> map to public storage path
        url = `/storage/ProfileImages/${url}`
      }
    }
    setPreviewImage(url)
  }, [profileimage])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleCancel = () => {
    router.visit('/account/profile')
  }
 
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
              <LeftAccountNavbar position="profile"></LeftAccountNavbar>
            </div>

          <div className="lg:col-span-2">
            <Form action="/account/profile" method="POST" encType="multipart/form-data">
              <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-300">
                    Update profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-8">
                    {/* Clickable Profile Picture Preview */}
                    <div 
                      onClick={handleImageClick}
                      className="relative cursor-pointer group"
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      {previewImage ? (
                        <img 
                          src={previewImage}
                          alt="Profile"
                          className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-70"
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <DefaultAvatar name={account?.name} size={200} showHoverEffect={true} />
                      )}
                      {/* Hover overlay indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                        <span className="text-white text-sm font-medium">Click to change</span>
                      </div>
                    </div>

                    {/* File input (hidden) */}
                    <Input 
                      ref={fileInputRef}
                      type="file" 
                      name="image"
                      onChange={handleImageChange}
                      className="hidden" 
                      accept="image/*"
                    />

                    {/* Buttons Section */}
                    <div className="flex flex-col space-y-3">
                      <Button 
                        type="button"
                        onClick={handleImageClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Upload Profile Picture
                      </Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="text-red-500 text-sm bg-red-200">{errors?Object.values(errors).map((valerror) => (
                   <div>{valerror}</div>
                      )):""}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 mb-2 gap-4">
                    
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        First Name
                      </label>
                      <Input
                      placeholder="Enter your first name..."
                        type="text"
                        defaultValue={account.name.split(" ")[0]}
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="firstname"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Last Name
                      </label>
                      <Input
                        placeholder="Enter your last name..."
                        type="text"
                        defaultValue={account.name.split(" ")[1]}
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="lastname"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email address..."
                      defaultValue={account.email?account.email:""}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="email"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Description
                    </label>
                    <textarea
                      defaultValue={account.description?account.description:""}
                      placeholder="Enter your personal description..."
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      name="description"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Linkedin
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your linkedin profile..."
                        defaultValue={account.linkedin?account.linkedin:""}
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="linkedin"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={account.phonenumber?account.phonenumber:"Enter your phone number..."}
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="phonenumber"
                      />
                    </div>
                    
                  </div>
                  
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

            </Form>
            
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
    </div>
  )
}