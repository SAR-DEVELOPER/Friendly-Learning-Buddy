import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/Breadcrumb'
import PageClient from './page.client'
import { PostsList } from './components/PostsList'

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'economy', label: 'Economy', icon: '📈' },
  { id: 'society', label: 'Society', icon: '👥' },
  { id: 'environment', label: 'Environment', icon: '🌍' },
  { id: 'governance', label: 'Governance', icon: '⚖️' },
]

export default async function TheNextBigThingsPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch all categories from the database
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  // Fetch hot/featured posts (most recent)
  const hotPosts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 8,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Fetch posts by category
  const postsByCategory = await Promise.all(
    CATEGORIES.map(async (category) => {
      const categoryDoc = categoriesData.docs.find(
        (cat) => cat.title?.toLowerCase() === category.label.toLowerCase()
      )

      if (!categoryDoc) {
        return { category, posts: [] }
      }

      const posts = await payload.find({
        collection: 'posts',
        depth: 2,
        limit: 6,
        overrideAccess: false,
        sort: '-publishedAt',
        where: {
          categories: {
            contains: categoryDoc.id,
          },
          _status: {
            equals: 'published',
          },
        },
      })

      return { category, posts: posts.docs }
    })
  )

  return (
    <div className="min-h-screen bg-background">
      <PageClient />
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-2 pb-4">
        <Breadcrumb
          items={[
            { label: 'The Next Big Things', href: '/the-next-big-things' }
          ]}
        />
      </div>

      {/* Category Navigation Tabs */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <nav className="flex justify-center overflow-x-auto scrollbar-hide">
            <Link 
              href="/the-next-big-things" 
              className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 border-b-2 border-gray-900 transition-all whitespace-nowrap"
            >
              All Topics
            </Link>
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.id}
                href={`/the-next-big-things?category=${cat.id}`}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section with integrated image */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[35vh]">
          <Image
            src="/media/big-thing.jpg"
            alt="The Next Big Things"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 lg:px-16 pb-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What&apos;s the next big thing that will reshape industries?
            </h1>
            <p className="text-lg text-white/90 leading-6 mb-4">
              Speculative but reasoned essays on emerging forces in industry, finance, and policy. Critical questions, not predictions.
            </p>
          </div>
        </div>
      </section>

      {/* Thoughtful text box */}
      <div className="w-full bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
          <div className="max-w-4xl">
            <p className="text-sm md:text-base text-gray-400 leading-relaxed italic">
              &ldquo;This is an ideas laboratory—not a blog, not a prediction service. The goal is to think seriously about forces that might reshape how we work, invest, and organize. Some ideas will be wrong. The value is in the reasoning, not the conclusions.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Essays & Analysis Header */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-12 pb-6">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Essays & Analysis</h2>
          <p className="text-sm text-gray-600">
            Explorations of technology shifts, policy experiments, and market structure changes.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search by Title */}
            <div>
              <label htmlFor="search-title" className="block text-xs font-medium text-gray-700 mb-1">
                Search Title
              </label>
              <input
                type="text"
                id="search-title"
                placeholder="Search posts..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>

            {/* Filter by Topic */}
            <div>
              <label htmlFor="filter-topic" className="block text-xs font-medium text-gray-700 mb-1">
                Topic
              </label>
              <select
                id="filter-topic"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              >
                <option value="">All Topics</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-xs font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              >
                <option value="-publishedAt">Newest First</option>
                <option value="publishedAt">Oldest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="-title">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Now Section */}
      {hotPosts.docs.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 lg:px-16 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
              <h3 className="text-xl font-bold text-gray-900">Hot Now</h3>
            </div>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
          
          <PostsList posts={hotPosts.docs.slice(0, 8)} showViewToggle={true} />
        </section>
      )}

      {/* Posts by Category */}
      {postsByCategory.map(({ category, posts }) => (
        <section key={category.id} className="container mx-auto px-4 md:px-8 lg:px-16 py-12 border-b border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-3xl font-bold text-gray-900">{category.label}</h2>
            </div>
            <Link 
              href={`/the-next-big-things?category=${category.id}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              View All →
            </Link>
          </div>

          {posts.length > 0 ? (
            <PostsList posts={posts} showViewToggle={true} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No posts yet in this category. Check back soon!</p>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'The Next Big Things - Friendly Learning Buddy',
    description: 'Speculative but reasoned essays on emerging forces in technology, economy, society, environment, and governance. Critical questions, not predictions.',
  }
}
