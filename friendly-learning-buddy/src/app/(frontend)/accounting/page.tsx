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
            { label: 'Accounting', href: '/accounting' }
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Accounting
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Accounting isn&apos;t just record-keeping. It&apos;s a language for describing economic reality. The choices
            in recognition, measurement, and classification shape how businesses make decisions, regulators set policy,
            and investors make judgments. Methodology, standards, and management.
          </p>
        </div>
      </section>

      {/* Featured Topics Grid */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FLSI Detail Card */}
          <Link href="/search?q=Accounting%20FLSI%20Detail">
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-200 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">FLSI Detail</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Deep-dive into line-item financial statement items and their treatment.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Learn More →
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• What it means, how it&apos;s measured</li>
                  <li>• Accounting policy choices, reporting</li>
                  <li>• Implications for stakeholders</li>
                  <li>• Disclosure requirements for classification</li>
                </ul>
              </div>
            </div>
          </Link>

          {/* Consolidated Recording Card */}
          <Link href="/search?q=Consolidated%20Recording">
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-200 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Consolidated Recording</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                How to combine financial statements and deal with group accounting complexities.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Learn More →
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Elimination entries and intercompany</li>
                  <li>• Non-controlling interests</li>
                  <li>• Business combination accounting</li>
                  <li>• Goodwill and fair value adjustments</li>
                </ul>
              </div>
            </div>
          </Link>

          {/* Statutory Reporting Card */}
          <Link href="/search?q=Statutory%20Reporting">
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-200 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Statutory Reporting</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                How to navigate differences from IFRS, local requirements, filing requirements.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                Learn More →
              </div>
              <div className="mt-4 pt-4 border-t border-purple-100">
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Local GAAP vs IFRS reconciliation</li>
                  <li>• Tax base vs book differences</li>
                  <li>• Regulatory compliance and filing requirements</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Key Procedures Section */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8">Key Procedures</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Consolidation Checklist */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Consolidation Checklist</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">1.</span>
                <span>Identify subsidiaries and control relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">2.</span>
                <span>Align accounting policies across group entities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">3.</span>
                <span>Eliminate all intercompany transactions (sales, loans, dividends)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">4.</span>
                <span>Calculate and record non-controlling interests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">5.</span>
                <span>Translate foreign operations (IFRS 21 / PSAK 10)</span>
              </li>
            </ul>
          </div>

          {/* Revenue Recognition Steps (PSAK 72) */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Revenue Recognition Steps (PSAK 72)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">1.</span>
                <span>Identify the contract with the customer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">2.</span>
                <span>Identify the performance obligations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">3.</span>
                <span>Determine the transaction price</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">4.</span>
                <span>Allocate price to each performance obligation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">5.</span>
                <span>Recognize revenue when (or as) each obligation is satisfied</span>
              </li>
            </ul>
          </div>

          {/* What-to-Check Expectations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">What-to-Check Expectations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Do the numbers reconcile year-over-year?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Are unusual items explained and well-supported?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Are related-party transactions disclosed?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Are judgments and estimates documented?</span>
              </li>
            </ul>
          </div>

          {/* PSAK vs IFRS Key Differences */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">PSAK vs IFRS Key Differences</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Timing: PSAK adoption may lag IFRS by 1-2 years</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Terminology: Different wording for same concepts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Transition: PSAK may have unique transition rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Carve-outs: Certain provisions may be carved out or adjusted</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Errors to Avoid */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Errors to Avoid</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recognition and Measurement Errors</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Recognizing revenue before control passes to the customer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Misclassifying expenses as assets (or vice versa)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Incorrect application of fair value vs historical cost</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Ignoring or Inconsistent Effects</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Failing to document significant judgments and estimates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Ignoring subsequent events that require adjustment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Applying inconsistent policies across similar transactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Before and After Performance */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Revenue Before Performance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Under older standards (IAS 18 / PSAK 23), revenue was often recognized when:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Risks and rewards of ownership transferred</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Amount could be measured reliably</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Economic benefits would flow to the entity</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Revenue After Performance (IFRS 15 / PSAK 72)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Modern standards focus on transfer of control and performance obligations:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Customer obtains control of the promised good or service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Performance obligations are satisfied over time or at a point in time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Variable consideration and constraint principles apply</span>
              </li>
            </ul>
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
