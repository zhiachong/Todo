'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section id="signup" className="py-16 sm:py-24 bg-gradient-to-br from-[#0066FF] via-[#4F46E5] to-[#8B5CF6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {!isSubmitted ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Share Your Best Rallies?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join the beta and get your first highlight reel free. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 bg-white text-[#0066FF] hover:bg-white/90 font-semibold px-6 whitespace-nowrap"
              >
                {isLoading ? (
                  'Joining...'
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-4 text-white/60 text-sm">
              Join 200+ players on the waitlist
            </p>
          </>
        ) : (
          <div className="py-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">You're on the list!</h2>
            <p className="text-lg text-white/80 max-w-md mx-auto">
              Check your inbox for a confirmation email. We'll be in touch soon with your first free highlight reel.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
