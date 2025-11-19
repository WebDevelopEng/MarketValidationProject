import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { getSelectedItems, clearCart, setSelected } from '@/lib/cart'
import { NavBar, Footer } from '../../LandingPage'
import { useState, useEffect } from 'react'

export default function CheckoutPage(){
  const [items, setItems] = useState([])
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    setItems(getSelectedItems())
  }, [])

  function placeOrder(){
    setProcessing(true)
    // Simulate order processing; in real app you'd send to backend
    setTimeout(() => {
      // Clear selected and remove items from cart for simplicity
      // This demo will clear the whole cart
      clearCart()
      setSelected([])
      setProcessing(false)
      alert('Order placed — thank you!')
      window.location.href = '/payment/bill'
    }, 1200)
  }

  const subtotal = items.reduce((s,i) => s + i.price * i.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Review & Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map(i => (
                    <div key={i.id} className="flex items-center justify-between bg-gray-900/20 p-3 rounded-md">
                      <div>
                        <div className="text-white font-semibold">{i.title}</div>
                        <div className="text-gray-400 text-sm">Qty: {i.quantity}</div>
                      </div>
                      <div className="text-blue-400 font-bold">${(i.price * i.quantity).toFixed(2)}</div>
                    </div>
                  ))}

                  <div className="mt-6">
                    <label className="block text-gray-300 mb-2">Card Information (demo)</label>
                    <input className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white" placeholder="Card number" />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <input className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white" placeholder="MM/YY" />
                      <input className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full items-center">
                  <div className="text-gray-300">Total: <span className="text-white font-bold ml-2">${total.toFixed(2)}</span></div>
                  <button onClick={placeOrder} disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{processing? 'Processing...':'Place Order'}</button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 space-y-2">
                  <div>Subtotal: ${subtotal.toFixed(2)}</div>
                  <div>Tax: ${tax.toFixed(2)}</div>
                  <div className="font-bold text-white">Total: ${total.toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
