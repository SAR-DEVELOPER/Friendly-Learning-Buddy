import type { Metadata } from 'next/types'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

const phases = [
  {
    number: '01',
    title: 'Where We Are Now',
    href: '/green-transition/where-we-are',
    description:
      'Current energy mix, emissions profile, existing policies, and the gap between climate commitments and economic reality.',
    guiding: 'What is the actual state—not the press releases?',
  },
  {
    number: '02',
    title: 'Challenges Ahead',
    href: '/green-transition/challenges',
    description:
      'The hard problems: stranded assets, grid stability, financing gaps, SME challenges, and the politics of transition costs.',
    guiding: 'What structural barriers will block progress?',
  },
  {
    number: '03',
    title: 'Pathways Forward',
    href: '/green-transition/pathways',
    description:
      'What might actually work: sector priorities, policy mechanisms, financing structures, and realistic timelines.',
    guiding: 'Which interventions create the highest leverage?',
  },
  {
    number: '04',
    title: 'Climate Finance',
    href: '/green-transition/climate-finance',
    description:
      'The instruments, institutions, and capital flows that fund the green transition. Green bonds, carbon markets, and climate-aligned lending.',
    guiding: 'Who provides the capital, on what terms, and what does it achieve?',
  },
]

const tradeoffs = [
  {
    title: 'Speed vs. Cost',
    description:
      'Faster transition timelines will demand larger upfront capital and disrupt existing energy infrastructure, creating stranded assets.',
  },
  {
    title: 'Grid Stability vs. Intermittency',
    description:
      'Renewable energy sources like solar and wind are intermittent, requiring costly backup capacity or storage to maintain grid stability.',
  },
  {
    title: 'Domestic Industry vs. Imports',
    description:
      'Building local manufacturing capacity costs more and takes longer, but importing cheaper creates supply chain dependencies.',
  },
  {
    title: 'Efficiency vs. Equity',
    description:
      'Carbon pricing is economically efficient, but hits poor households harder. Subsidies are less efficient but more politically sustainable.',
  },
]

export default function GreenTransitionPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageClient />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[40vh]">
          <Image
            src="/windfarm.webp"
            alt="Green transition - wind turbines at sunset"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 lg:px-16 pb-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Would it be green transition for the rich and energy poverty for the rest?
            </h1>
            <p className="text-lg text-white/90 leading-6">
              The energy transition is a financial and economic problem—not just an environmental one.
              Who pays? Who benefits? Who gets left behind?
            </p>
          </div>
        </div>
      </section>

      {/* Quote box */}
      <div className="w-full bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
          <p className="text-sm md:text-base text-gray-400 leading-relaxed italic max-w-4xl">
            &ldquo;How do you decarbonize an economy without crushing growth or creating energy poverty?
            These essays explore the trade-offs, the stakeholders, and the realistic pathways.&rdquo;
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-2">
        <Breadcrumb items={[{ label: 'Green Transition', href: '/green-transition' }]} />
      </div>

      {/* Phase cards — Finance style */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {phases.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start justify-between border border-border rounded-lg p-6 hover:border-foreground transition-colors"
            >
              <div className="flex gap-4">
                <span className="text-sm text-muted-foreground font-mono pt-0.5">{item.number}</span>
                <div>
                  <p className="font-semibold text-foreground mb-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground italic">{item.guiding}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1 ml-4" />
            </Link>
          ))}
        </div>
      </section>

      {/* Trade-offs */}
      <section className="w-full bg-gray-100 border-y border-gray-300 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Trade-offs Worth Understanding
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradeoffs.map((t) => (
                <div
                  key={t.title}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <h3 className="text-base font-bold text-gray-900 mb-3">{t.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'The Green Transition | Friendly Learning Buddy',
    description:
      'The energy transition is a financial and economic problem. Explore who pays, who benefits, and who gets left behind.',
  }
}
