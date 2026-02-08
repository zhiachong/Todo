'use client'

import { useState } from 'react'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface PricingTier {
  name: string
  icon: React.ReactNode
  monthlyPrice: number
  yearlyPrice: number
  uploads: number
  resolution: string
  features: string[]
  popular?: boolean
  cta: string
}

const tiers: PricingTier[] = [
  {
    name: 'Game',
    icon: <Zap className="w-5 h-5" />,
    monthlyPrice: 4.99,
    yearlyPrice: 47.99,
    uploads: 2,
    resolution: '720p30',
    features: [
      '2 video uploads per month',
      '720p 30fps output',
      'Basic rally detection',
      'Email delivery',
      'No watermark',
    ],
    cta: 'Start with Game',
  },
  {
    name: 'Set',
    icon: <Sparkles className="w-5 h-5" />,
    monthlyPrice: 9.99,
    yearlyPrice: 95.99,
    uploads: 6,
    resolution: '4K',
    features: [
      '6 video uploads per month',
      '4K Ultra HD output',
      'Advanced rally detection',
      'Priority processing',
      'Email + download link',
      'No watermark',
    ],
    popular: true,
    cta: 'Choose Set',
  },
  {
    name: 'Match',
    icon: <Crown className="w-5 h-5" />,
    monthlyPrice: 39.99,
    yearlyPrice: 383.99,
    uploads: -1, // unlimited
    resolution: '4K',
    features: [
      'Unlimited video uploads',
      '4K Ultra HD output',
      'Premium rally detection',
      'Fastest processing',
      'Email + download + cloud storage',
      'No watermark',
      'Priority support',
    ],
    cta: 'Go Unlimited',
  },
]

function formatPrice(price: number): string {
  return price.toFixed(2)
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your game. All plans include rally detection and highlight creation.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${
                tier.popular
                  ? 'border-[#0066FF] ring-1 ring-[#0066FF] shadow-lg shadow-[#0066FF]/10'
                  : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0066FF] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tier.popular ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tier.icon}
                  </div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {tier.uploads === -1
                    ? 'Unlimited uploads'
                    : `${tier.uploads} uploads per month`}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ${formatPrice(isYearly ? tier.yearlyPrice / 12 : tier.monthlyPrice)}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-gray-500 mt-1">
                      ${formatPrice(tier.yearlyPrice)} billed yearly
                    </p>
                  )}
                </div>

                {/* Resolution Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    tier.resolution === '4K'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Zap className="w-3 h-3" />
                    {tier.resolution === '4K' ? '4K Ultra HD' : '720p 30fps'}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        tier.popular ? 'bg-[#0066FF]/10' : 'bg-gray-100'
                      }`}>
                        <Check className={`w-3 h-3 ${tier.popular ? 'text-[#0066FF]' : 'text-gray-600'}`} />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    tier.popular
                      ? 'bg-[#0066FF] hover:bg-[#0066FF]/90 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-gray-500 mt-10">
          All plans include a 14-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  )
}
