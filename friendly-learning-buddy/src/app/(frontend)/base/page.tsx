import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
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

      
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Accounting - Friendly Learning Buddy',
    description: 'Accounting isn\'t just record-keeping. Explore consolidation, policy choices, PSAK application, and financial statement analysis.',
  }
}
