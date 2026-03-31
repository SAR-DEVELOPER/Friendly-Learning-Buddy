import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/Breadcrumb'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export default async function AccountingPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch accounting-related posts
  const accountingPosts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  console.log(accountingPosts)

  return (
    <div className="min-h-screen bg-background">
      <PageClient />
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-2 pb-4">
        <Breadcrumb
          items={[
            { label: 'Green Transition', href: '/green-transition' }
          ]}
        />
      </div>

      {/* Mini Navigation Tabs */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <nav className="flex justify-center overflow-x-auto scrollbar-hide">
            <Link 
              href="/green-transition/where-we-are" 
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap"
            >
              Where We Are Now
            </Link>
            <Link 
              href="/green-transition/challenges" 
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap"
            >
              Challenges Ahead
            </Link>
            <Link 
              href="/green-transition/pathways" 
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap"
            >
              Pathways Forward
            </Link>
            <Link 
              href="/green-transition/climate-finance" 
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap"
            >
              Climate Finance
            </Link>
            <Link 
              href="/green-transition/tracker" 
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap"
            >
              Transition Tracker
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section with integrated image */}
      <section className="relative w-full overflow-hidden">
        {/* Hero image - full width */}
        <div className="relative w-full h-[35vh]">
          <Image
            src="/media/environment.jpg"
            alt="Green transition - wind turbines at sunset"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 lg:px-16 pb-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Would it be green transition for the rich and energy poverty for the rest?
            </h1>
            <p className="text-lg text-white/90 leading-6 mb-4">
              The energy transition is a financial and economic problem—not just an environmental one. Who pays? Who benefits? Who gets left behind?
            </p>
          </div>
        </div>
      </section>

      {/* Thoughtful text box - grey background */}
      <div className="w-full bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
          <div className="max-w-4xl">
            <p className="text-sm md:text-base text-gray-400 leading-relaxed italic">
              &ldquo;How do you decarbonize an economy without crushing growth or creating energy poverty? These essays explore the trade-offs, the stakeholders, and the realistic pathways.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Explore by Phase - Connected Timeline */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Explore by Phase</h2>
        
        {/* Phase progression with connecting lines */}
        <div className="max-w-6xl mx-auto">
          
          {/* Row 1: Where We Are Now → Challenges Ahead → Pathways Forward */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-8">
            
            {/* Phase 1: Where We Are Now */}
            <div className="relative">
              <Link href="/green-transition/where-we-are" className="block group">
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-8 hover:bg-white hover:border-gray-400 hover:shadow-md transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Where We Are Now</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    Current energy mix, emissions profile, existing policies, and the gap between climate commitments and economic reality.
                  </p>
                  <p className="text-xs text-gray-500 italic mb-4">
                    What is the actual state—not the press releases?
                  </p>
                  <div className="text-sm text-gray-900 font-medium group-hover:text-gray-700">
                    View Essays →
                  </div>
                </div>
              </Link>
              {/* Connector arrow - hidden on mobile */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Phase 2: Challenges Ahead */}
            <div className="relative">
              <Link href="/green-transition/challenges" className="block group">
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-8 hover:bg-white hover:border-gray-400 hover:shadow-md transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Challenges Ahead</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    The hard problems: stranded assets, grid stability, financing gaps, SME challenges, and the politics of transition costs.
                  </p>
                  <p className="text-xs text-gray-500 italic mb-4">
                    What structural barriers will block progress?
                  </p>
                  <div className="text-sm text-gray-900 font-medium group-hover:text-gray-700">
                    View Essays →
                  </div>
                </div>
              </Link>
              {/* Connector arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Phase 3: Pathways Forward */}
            <div className="relative">
              <Link href="/green-transition/pathways" className="block group">
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-8 hover:bg-white hover:border-gray-400 hover:shadow-md transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Pathways Forward</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    What might actually work: sector priorities, policy mechanisms, financing structures, and realistic timelines.
                  </p>
                  <p className="text-xs text-gray-500 italic mb-4">
                    Which interventions create the highest leverage?
                  </p>
                  <div className="text-sm text-gray-900 font-medium group-hover:text-gray-700">
                    View Essays →
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Connector to Phase 4 - centered arrow pointing down */}
          <div className="flex justify-center mb-8">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Phase 4: Climate Finance - full width */}
          <div className="max-w-2xl mx-auto">
            <Link href="/green-transition/climate-finance" className="block group">
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-8 hover:bg-white hover:border-gray-400 hover:shadow-md transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Climate Finance</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  The instruments, institutions, and capital flows that fund the green transition. Green bonds, carbon markets, and climate-aligned lending.
                </p>
                <p className="text-xs text-gray-500 italic mb-4">
                  Who provides the capital, on what terms, and what does it achieve?
                </p>
                <div className="text-sm text-gray-900 font-medium group-hover:text-gray-700">
                  View Essays →
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Trade-offs Worth Understanding */}
      <section className="w-full bg-gray-100 border-y border-gray-300 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Trade-offs Worth Understanding</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Trade-off 1: Speed vs. Cost */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Speed vs. Cost</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Faster transition timelines will demand larger upfront capital and disrupt existing energy infrastructure, creating stranded assets.
              </p>
            </div>

            {/* Trade-off 2: Grid Stability vs. Intermittency */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Grid Stability vs. Intermittency</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Renewable energy sources like solar and wind are intermittent, requiring costly backup capacity or storage to maintain grid stability.
              </p>
            </div>

            {/* Trade-off 3: Domestic Industry vs. Imports */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Domestic Industry vs. Imports</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Building local manufacturing capacity costs more and takes longer, but importing cheaper but creates supply chain dependencies.
              </p>
            </div>

            {/* Trade-off 4: Efficiency vs. Equity */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Efficiency vs. Equity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Carbon pricing is economically efficient, but hits poor households harder. Subsidies are less efficient but more politically sustainable.
              </p>
            </div>

          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Accounting - Friendly Learning Buddy',
    description: 'Accounting isn\'t just record-keeping. Explore consolidation, policy choices, PSAK application, and financial statement analysis.',
  }
}
