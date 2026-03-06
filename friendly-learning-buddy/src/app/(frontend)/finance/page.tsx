import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-4">
        <Breadcrumb
          items={[
            { label: 'Finance', href: '/finance' }
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Finance
          </h1>
          <p className="text-lg text-muted-foreground leading-6 mb-4 ">
            Finance exists to support decisions — not to produce reports. This section covers the ideas, the strategy, the planning, and the analysis.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Start with Fundamentals if you are building from scratch.
          </p>
        </div>
      </section>

      {/* Featured Topics Grid */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/finance/fundamentals">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 h-full relative">
              <span className="absolute top-4 right-4 w-7 h-7 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fundamentals</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Core concepts every finance professional should master.
              </p>
              <div className="text-sm text-gray-900 font-medium">
                Learn More →
              </div>
            </div>
          </Link>
          <Link href="/finance/strategic-finance">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 h-full relative">
              <span className="absolute top-4 right-4 w-7 h-7 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Strategic Finance</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Applied decision-making at CFO and board level.
              </p>
              <div className="text-sm text-gray-900 font-medium">
                Learn More →
              </div>
            </div>
          </Link>
          <Link href="/finance/planning-and-forecasting">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 h-full relative">
              <span className="absolute top-4 right-4 w-7 h-7 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Planning and Forecasting</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Translating Strategy into operational financial management.
              </p>
              <div className="text-sm text-gray-900 font-medium">
                Learn More →
              </div>
            </div>
          </Link>
          <Link href="/finance/financial-analytics">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 h-full relative">
              <span className="absolute top-4 right-4 w-7 h-7 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Financial Analytics</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Quantitative tools and diagnostic intelligence for finance professionals.
              </p>
              <div className="text-sm text-gray-900 font-medium">
                Learn More →
              </div>
            </div>
          </Link>
          <Link href="/finance/capital-allocation">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 h-full relative">
              <span className="absolute top-4 right-4 w-7 h-7 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Capital Allocation</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                15 recurring capital conditions observed in Indonesian markets. Institutional framework for allocators.
              </p>
              <div className="text-sm text-gray-900 font-medium">
                Learn More →
              </div>
            </div>
          </Link>
          <Link href="/finance/finance-in-action">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 h-full relative">
              <span className="absolute top-4 right-4 w-7 h-7 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold">6</span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Finance in Action</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Institutional-grade financial models and capital decision frameworks - executable doctrine.
              </p>
              <div className="text-sm text-gray-900 font-medium">
                Learn More →
              </div>
            </div>
          </Link>
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
