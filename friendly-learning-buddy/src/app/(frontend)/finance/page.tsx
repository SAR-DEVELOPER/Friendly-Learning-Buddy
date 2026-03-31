import type { Metadata } from 'next/types'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'

export const dynamic = 'force-dynamic'

const subcategories = [
  {
    number: '01',
    title: 'Fundamentals',
    href: '/finance/fundamentals',
    description: 'Core concepts every finance professional must master.',
    badge: 'START HERE',
  },
  {
    number: '02',
    title: 'Strategic Finance',
    href: '/finance/strategic-finance',
    description: 'Applied decision-making at CFO and board level.',
  },
  {
    number: '03',
    title: 'Planning & Forecasting',
    href: '/finance/planning-and-forecasting',
    description: 'Translating strategy into operational financial management.',
  },
  {
    number: '04',
    title: 'Financial Analytics',
    href: '/finance/financial-analytics',
    description: 'Quantitative tools and diagnostic intelligence for finance professionals.',
  },
  {
    number: '05',
    title: 'Capital Allocation',
    href: '/finance/capital-allocation',
    description:
      '15 recurring capital conditions observed in Indonesian markets. Institutional framework for allocators.',
  },
  {
    number: '06',
    title: 'Finance in Action',
    href: '/finance/finance-in-action',
    description:
      'Institutional-grade financial models and capital decision frameworks — executable doctrine.',
  },
]

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Finance' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Finance</h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-2">
            Finance exists to support decisions — not to produce reports. This section covers the
            ideas, the strategy, the planning, and the analysis.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Start with Fundamentals if you are building from scratch.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {subcategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start justify-between border border-border rounded-lg p-6 hover:border-foreground transition-colors"
            >
              <div className="flex gap-4">
                <span className="text-sm text-muted-foreground font-mono pt-0.5">{item.number}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold tracking-widest border border-muted-foreground text-muted-foreground px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1 ml-4" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Finance | Friendly Learning Buddy',
    description:
      'Finance exists to support decisions — not to produce reports. Explore fundamentals, strategic finance, planning, analytics, and capital allocation.',
  }
}
