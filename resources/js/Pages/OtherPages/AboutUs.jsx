import React from 'react'
import { NavBar, Footer } from '../LandingPage'

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
        <p className="text-gray-300 max-w-3xl">We build tools that help designers sell digital products and connect with clients. Our mission is to make creative commerce simple and delightful.</p>
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-white font-semibold mb-2">Our Story</h2>
          <p className="text-gray-300">Started by designers in 2024, we wanted a place to buy and sell high-quality design assets with confidence and great support.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
