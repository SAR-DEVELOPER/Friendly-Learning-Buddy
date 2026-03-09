import type { Metadata } from 'next/types'
import React from 'react'
import { Search } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function FLSIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-4 pb-4">
        <Breadcrumb
          items={[
            { label: 'Finance', href: '/finance' },
            { label: 'Fundamentals', href: '/finance/fundamentals' },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fundamentals
          </h1>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'FLSI Detail - Consolidated Statement of Financial Position',
    description: 'Detailed consolidated statement of financial position with line-by-line explanations and accounting treatment.',
  }
}
