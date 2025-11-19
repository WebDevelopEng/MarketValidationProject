import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { getCart, removeFromCart, updateQuantity, setSelected, getSelected } from '@/lib/cart'
import { NavBar, Footer } from '../../LandingPage'
import { usePage } from '@inertiajs/react'
export default function CartPage(){
  const {transaction}=usePage().props
  const [items, setItems] = useState([])
  const [selected, setSelectedState] = useState([])
useEffect(() => {
  if (transaction && transaction.items) {
    setItems(transaction.items)
}})
  useEffect(() => {
    setItems(getCart())
    setSelectedState(getSelected())
  }, [])

  function onRemove(id){
    const next = removeFromCart(id)
    setItems(next)
    setSelectedState(prev => prev.filter(x => x !== id))
    // update selected storage
    setSelected(getSelected().filter(x => x !== id))
  }

  function onQtyChange(id, qty){
    const next = updateQuantity(id, Number(qty))
    setItems(next)
  }

  function toggleSelect(id){
    const cur = getSelected()
    let next
    if (cur.includes(id)) {
      next = cur.filter(x => x !== id)
    } else {
      next = [...cur, id]
    }
    setSelected(next)
    setSelectedState(next)
  }

  function proceed(){
    const sel = getSelected()
    if (!sel || sel.length === 0) {
      alert('Select at least one item to proceed to checkout')
      return
    }
    window.location.href = '/payment/checkout-summary'
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>

        {items? (
          <Card className="bg-gray-800 border border-gray-700 p-6">
            <CardContent>
              <p className="text-gray-300">Your cart is empty.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-900/20 rounded-md">
                        <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4" />
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-1">
                          <div className="text-white font-semibold">{item.title}</div>
                          <div className="text-gray-400 text-sm">{item.description}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-blue-400 font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="mt-2 flex items-center gap-2">
                            <input type="number" value={item.quantity} min="1" onChange={(e) => onQtyChange(item.id, e.target.value)} className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white" />
                            <button onClick={() => onRemove(item.id)} className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <div className="text-gray-300">Select items and proceed to checkout</div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelected(items.map(i => i.id)); setSelectedState(items.map(i => i.id)); setSelected(items.map(i => i.id)) }} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Select All</button>
                      <button onClick={() => { setSelected([]); setSelectedState([]); setSelected([]) }} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Clear Selection</button>
                      <button onClick={proceed} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go to Checkout</button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-300">
                    <div>Items: {items.length}</div>
                    <div>Total: ${items.reduce((s,i)=>s + (i.price*i.quantity),0).toFixed(2)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
