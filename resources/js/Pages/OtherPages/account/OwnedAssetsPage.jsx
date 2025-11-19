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
import { Link } from '@inertiajs/react'
import {usePage} from '@inertiajs/react'
import LeftAccountNavbar from './LeftAccountNavbar'
import { Button } from "@heroui/button"
export default function OwnedAssetsPage(){
  const {assets} = usePage().props
  
    return(
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
      
      <div className="w-full flex-1">
        {/* Page Header */}
        <div className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">Owned Assets</h1>
            
            
              
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
            <LeftAccountNavbar position="assets"></LeftAccountNavbar>
            </div>
            {/* Main Content - Orders List */}
            <div className="lg:col-span-3">

              <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white mb-5">Asset Page</CardTitle>
                    <Link href="/account/assets/create"> <Button color='secondary' className="rounded-md">+ Create an asset</Button></Link>
                    {Array.isArray(assets) && assets.map((asset)=>(
                <div key={asset.id} className="border border-gray-700 rounded-lg p-6 bg-gray-700/30">
                      <div className="grid grid-cols-3 justify-between mb-4 text-center">
                        <div>
                          <h3 className="text-white font-semibold text-lg">Asset ID: {asset.id}</h3>
                          <img src={`/storage/${asset.images[0].filepath}`} className="w-[300px] h-[300px]"></img>
                        </div>
                        <div className="">
                          
                          <h5 className="text-white font-semibold text-lg">{asset.name}</h5>
                          
                          <p className="text-gray-400 font-muted text-lg">Formats: {asset.format.substring(0,100)}</p>
                          <br></br>
                          <p className="text-white font-semibold text-sm">{asset.description.substring(0,100)}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 md:mt-0 text-center">
                          <Button color="primary" className="ml-auto mr-auto"><Link href={`/asset/${asset.id}`}>Access file</Link></Button>
                        </div>
                        <div className="">


                        </div>
                      </div>
                  </div>
              ))}
                </CardHeader>
                <CardContent>
                  
                </CardContent>
              </Card>
              <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm  mt-6">
                <CardHeader>
                  <CardTitle className="text-white">Request History</CardTitle>
                  <CardDescription className="text-gray-300">
                    
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  

                  {/* Empty State (if no orders) */}
                  
                </CardContent>
              </Card>

              
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
    )



}