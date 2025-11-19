import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NavBar, Footer } from '../../LandingPage'
import { getCart, getSelected, clearSelected } from '@/lib/cart'

export default function CheckoutSummaryPage() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // Load all cart items and filter to selected ones
    const allItems = getCart()
    const selectedIds = getSelected()
    
    if (selectedIds && selectedIds.length > 0) {
      // Show only selected items
      const selected = allItems.filter(item => selectedIds.includes(item.id))
      setCartItems(selected)
    } else if (allItems && allItems.length > 0) {
      // Fallback: show all items if no selection was made
      setCartItems(allItems)
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar/>
      
      {/* Header Section */}
      <div className="bg-gray-900 border-b border-gray-700 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-2">Order Summary</h1>
          <p className="text-gray-400">Review your items before checkout</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b border-gray-700 last:border-b-0"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-gray-300">Qty: <span className="font-semibold">{item.quantity}</span></span>
                          <span className="text-lg font-bold text-blue-400">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Promo Code Section */}
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Apply Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors font-medium">
                    Apply
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Section */}
          <div>
            <Card className="bg-gray-800 border-gray-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Order Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-blue-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-6">
                <button onClick={() => window.location.href = '/payment/checkout'} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                  Proceed to Checkout
                </button>
                <button onClick={() => { clearSelected(); window.location.href = '/cart' }} className="w-full bg-gray-700 text-gray-200 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium">
                  Back to Cart
                </button>
              </CardFooter>
            </Card>

            {/* Security Info */}
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl mt-1">🔒</div>
                <div>
                  <p className="text-white font-semibold text-sm">Secure Payment</p>
                  <p className="text-gray-400 text-xs mt-1">Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
