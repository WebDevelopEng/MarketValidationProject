import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { NavBar, Footer } from '../../LandingPage'

export default function BillPage(){
  // Sample invoice data (in production, would come from props/backend)
  const invoice = {
    id: 'INV-2025-00342',
    date: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString(),
    status: 'Paid',
    items: [
      { id: 1, title: 'Website Template - Modern Business', price: 49.99, qty: 1, total: 49.99 },
      { id: 2, title: 'Custom Logo Design', price: 199.99, qty: 1, total: 199.99 }
    ],
    subtotal: 249.98,
    tax: 25.00,
    total: 274.98,
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Suite 100, New York, NY 10001'
    },
    company: {
      name: 'Desinar',
      email: 'billing@desinar.com',
      phone: '+62 123 456 789',
      address: 'Jakarta, Indonesia'
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white text-3xl mb-2">Invoice</CardTitle>
                <div className="text-gray-400">Invoice #: <span className="text-white font-semibold">{invoice.id}</span></div>
              </div>
              <div className="text-right">
                <div className="text-gray-400">Status: <span className={`font-semibold ${invoice.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{invoice.status}</span></div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Invoice Date</div>
                <div className="text-white">{invoice.date}</div>
              </div>
              <div>
                <div className="text-gray-400">Due Date</div>
                <div className="text-white">{invoice.dueDate}</div>
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-gray-400 text-sm mb-2">From</div>
                <div className="text-white">
                  <div className="font-semibold">{invoice.company.name}</div>
                  <div className="text-sm text-gray-300">{invoice.company.address}</div>
                  <div className="text-sm text-gray-300">{invoice.company.email}</div>
                  <div className="text-sm text-gray-300">{invoice.company.phone}</div>
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Bill To</div>
                <div className="text-white">
                  <div className="font-semibold">{invoice.customer.name}</div>
                  <div className="text-sm text-gray-300">{invoice.customer.address}</div>
                  <div className="text-sm text-gray-300">{invoice.customer.email}</div>
                  <div className="text-sm text-gray-300">{invoice.customer.phone}</div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border-t border-b border-gray-700 py-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-gray-300 py-2">Description</th>
                    <th className="text-right text-gray-300 py-2 w-24">Price</th>
                    <th className="text-right text-gray-300 py-2 w-16">Qty</th>
                    <th className="text-right text-gray-300 py-2 w-24">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td className="text-white py-3">{item.title}</td>
                      <td className="text-right text-gray-300 py-3">${item.price.toFixed(2)}</td>
                      <td className="text-right text-gray-300 py-3">{item.qty}</td>
                      <td className="text-right text-white font-semibold py-3">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex justify-end">
              <div className="w-full sm:w-80 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (10%)</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg border-t border-gray-600 pt-2">
                  <span>Total</span>
                  <span className="text-blue-400">${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div className="text-gray-400 text-sm mb-2">Notes</div>
              <div className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-md">
                Thank you for your business! If you have any questions about this invoice, please contact us at {invoice.company.email}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 justify-center">
            <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Print / Save as PDF
            </button>
            <button onClick={() => window.history.go(-4)} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              Finish
            </button>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
