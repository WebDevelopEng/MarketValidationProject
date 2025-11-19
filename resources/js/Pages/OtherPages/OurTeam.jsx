import React from 'react'
import { NavBar, Footer } from '../LandingPage'

export default function OurTeam() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
        <p className="text-gray-300 max-w-3xl">Meet the team behind the platform. We're a small group of designers and developers passionate about building beautiful marketplace experiences.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 mb-4" />
            <h3 className="text-white font-semibold">Alex Doe</h3>
            <p className="text-gray-400">Founder & Designer</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 mb-4" />
            <h3 className="text-white font-semibold">Jamie Smith</h3>
            <p className="text-gray-400">Engineering</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
