import { Hero } from '@/components/Hero'
import { ProblemSolution } from '@/components/ProblemSolution'
import { ComparisonTable } from '@/components/ComparisonTable'
import { Pricing } from '@/components/Pricing'
import { SignupForm } from '@/components/SignupForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProblemSolution />
      <ComparisonTable />
      <Pricing />
      <SignupForm />
    </div>
  )
}
