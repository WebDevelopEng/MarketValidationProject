import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { usePage } from '@inertiajs/react'
import { NavBar, Footer } from '../LandingPage'

export default function ForgotPasswordPage(){
  const { account } = usePage().props
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    // This page is presentational — replace with Inertia.post or fetch to your password email route
    setTimeout(() => {
      setStatus('If the email exists, a reset link has been sent.')
      setSubmitting(false)
    }, 700)
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavBar/>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Forgot your password?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">Enter the email associated with your account and we'll send a password reset link.</p>

            {status && (
              <div className="mb-4 p-3 rounded-md bg-green-900/30 border border-green-700 text-green-200">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="you@domain.com"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {submitting ? 'Sending...' : 'Send reset link'}
                </button>

                <a href="/login" className="text-sm text-gray-300 hover:text-white underline ml-auto">Back to login</a>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-gray-400">If you don't receive the email, check your spam folder or try again.</p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Don't have an account? <a href="/register" className="text-white underline">Create one</a></p>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
