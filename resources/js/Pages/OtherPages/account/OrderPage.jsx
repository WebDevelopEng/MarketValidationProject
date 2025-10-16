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
export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Completed",
      items: [
        { name: "UI Kit - Modern Dashboard", price: "Rp 150.000", quantity: 1 },
        { name: "Icon Pack - Business Essentials", price: "Rp 75.000", quantity: 1 }
      ],
      total: "Rp 225.000",
      downloadUrl: "#"
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Completed",
      items: [
        { name: "Font Family - Geometric Sans", price: "Rp 100.000", quantity: 1 }
      ],
      total: "Rp 100.000",
      downloadUrl: "#"
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      items: [
        { name: "Illustration Pack - Modern Scenes", price: "Rp 200.000", quantity: 1 },
        { name: "Mockup Pack - Devices", price: "Rp 120.000", quantity: 1 },
        { name: "Texture Pack - Abstract Backgrounds", price: "Rp 80.000", quantity: 1 }
      ],
      total: "Rp 400.000",
      downloadUrl: "#"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500'
      case 'Processing': return 'bg-yellow-500'
      case 'Cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <NavBar/>
      
      <div className="w-full flex-1">
        {/* Page Header */}
        <div className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4">My Orders</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              View your purchase history and download your assets
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-1">
            <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
            <CardTitle className="text-white">Account Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
            <div>
                <Link href='/account/profile'>
                <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                    Profile
                </Button>
                </Link>
            </div>
            <div>
                <Link href='/account/orders'>
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
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
            
            {/* Main Content - Orders List */}
            <div className="lg:col-span-3">
                {/* Order Statistics */}
              <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-white">{orders.length}</div>
                      <div className="text-gray-400 text-sm">Total Orders</div>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {orders.filter(o => o.status === 'Completed').length}
                      </div>
                      <div className="text-gray-400 text-sm">Completed</div>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {orders.filter(o => o.status === 'Processing').length}
                      </div>
                      <div className="text-gray-400 text-sm">Processing</div>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-white">Rp 725.000</div>
                      <div className="text-gray-400 text-sm">Total Spent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm  mt-6">
                <CardHeader>
                  <CardTitle className="text-white">Order History</CardTitle>
                  <CardDescription className="text-gray-300">
                    You have {orders.length} orders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-700 rounded-lg p-6 bg-gray-700/30">
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{order.id}</h3>
                          <p className="text-gray-400 text-sm">Ordered on {order.date}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 md:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-white font-semibold text-lg">{order.total}</span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-white">{item.price}</p>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                        <div className="text-sm text-gray-400">
                          {order.status === 'Completed' ? 'Ready for download' : 'Processing your order...'}
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-gray-600 hover:bg-gray-500 text-white text-sm">
                            View Invoice
                          </Button>
                          {order.status === 'Completed' && (
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                              Download All
                            </Button>
                          )}
                          {order.status === 'Processing' && (
                            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm">
                              Track Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Empty State (if no orders) */}
                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">📦</div>
                      <h3 className="text-white text-xl font-semibold mb-2">No orders yet</h3>
                      <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Browse Products
                      </Button>
                    </div>
                  )}
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