import React from 'react'
import { NavBar, Footer } from '../LandingPage'

export default function CustomerService() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Customer Service</h1>
        <p className="text-gray-300 max-w-3xl">If you need help, please reach out to our support team at <a href="mailto:support@example.com" className="text-blue-400">support@example.com</a> or use the contact form on this page. We aim to respond within 48 hours.</p>
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-white font-semibold mb-2">Frequently Asked Questions</h2>
          <ul className="text-gray-300 list-disc pl-5">
            <li>How do I download purchased assets?</li>
            <li>How do I request a refund?</li>
            <li>How do I contact a designer?</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
