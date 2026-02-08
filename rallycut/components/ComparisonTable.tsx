'use client'

import { Check, X, Minus } from 'lucide-react'

interface Competitor {
  name: string
  price: string
}

interface FeatureComparison {
  feature: string
  rallycut: 'yes' | 'no' | 'partial' | string
  competitors: ('yes' | 'no' | 'partial' | string)[]
}

const competitors: Competitor[] = [
  { name: 'SwingVision', price: '$180/year' },
  { name: 'TopCourt', price: '$180/year' },
]

const features: FeatureComparison[] = [
  { feature: '4K Export Resolution', rallycut: 'yes', competitors: ['no', 'no'] },
  { feature: 'No Watermarks', rallycut: 'yes', competitors: ['no', 'partial'] },
  { feature: 'Dedicated Highlight Reels', rallycut: 'yes', competitors: ['partial', 'no'] },
  { feature: 'Simple, Focused Experience', rallycut: 'yes', competitors: ['no', 'no'] },
  { feature: 'Built by Tennis Fans', rallycut: 'yes', competitors: ['no', 'no'] },
  { feature: 'Price', rallycut: 'From $4.99/mo', competitors: ['$15/mo', '$15/mo'] },
]

function FeatureIcon({ value }: { value: 'yes' | 'no' | 'partial' | string }) {
  if (value === 'yes') {
    return (
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-green-600" />
      </div>
    )
  }
  if (value === 'no') {
    return (
      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
        <X className="w-4 h-4 text-red-500" />
      </div>
    )
  }
  if (value === 'partial') {
    return (
      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
        <Minus className="w-4 h-4 text-amber-600" />
      </div>
    )
  }
  return <span className="text-sm font-medium text-gray-700">{value}</span>
}

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Players Choose RallyCut
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We built exactly what tennis players asked for — nothing more, nothing less.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Feature
            </div>
            <div className="text-center">
              <div className="inline-flex flex-col items-center">
                <span className="text-sm font-bold text-[#0066FF]">RallyCut</span>
                <span className="text-xs text-gray-500">From $4.99/mo</span>
              </div>
            </div>
            {competitors.map((comp) => (
              <div key={comp.name} className="text-center">
                <div className="inline-flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700">{comp.name}</span>
                  <span className="text-xs text-gray-500">{comp.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Body */}
          {features.map((row, idx) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 gap-4 p-6 items-center ${
                idx !== features.length - 1 ? 'border-b border-gray-100' : ''
              } ${idx % 2 === 1 ? 'bg-gray-50/50' : ''}`}
            >
              <div className="text-sm font-medium text-gray-900">{row.feature}</div>
              <div className="flex justify-center">
                <FeatureIcon value={row.rallycut} />
              </div>
              {row.competitors.map((val, i) => (
                <div key={i} className="flex justify-center">
                  <FeatureIcon value={val} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <span>Yes / Included</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
              <Minus className="w-3 h-3 text-amber-600" />
            </div>
            <span>Limited / Partial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-3 h-3 text-red-500" />
            </div>
            <span>No / Not Available</span>
          </div>
        </div>
      </div>
    </section>
  )
}
