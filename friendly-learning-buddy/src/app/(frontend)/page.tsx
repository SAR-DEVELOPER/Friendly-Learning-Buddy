import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch latest posts for the feed
  const latestPosts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 6,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  // Fetch recommended posts
  const recommendedPosts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 5,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Full Width Hero - No Max Width */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          {/* You can replace this with an actual image */}
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
          {/* Alternative: Use an image */}
          {/* <img src="/path-to-your-image.jpg" alt="Hero" className="object-cover w-full h-full" /> */}
        </div>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        {/* Hero Content - Left Aligned */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl text-left text-white">
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                Let&apos;s be insane and delusional.
              </h1>
              
              {/* Subheadline */}
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 text-white/90 drop-shadow-lg">
                We never know how many doors will open.
              </p>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl drop-shadow">
                Bridging finance, strategy, and data to create impact.
              </p>
              
              {/* CTA Button */}
              <Link 
                href="/posts"
                className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
              >
                Explore My Work
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>


      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Analysis</h2>
            <p className="text-gray-600">Latest essays across sections.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPosts.docs.slice(0, 4).map((post) => {
              const postImage = post.meta?.image
              const author = post.authors && Array.isArray(post.authors) && post.authors[0] && typeof post.authors[0] === 'object' ? post.authors[0].name : 'Dika Gustiana'
              const readTime = '7 min read'
              const category = 'Green Transition'
              
              return (
                <Link 
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <div className="mb-4">
                      <span className="inline-block text-xs font-medium text-gray-600 mb-3">
                        {category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      {post.meta?.description && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {post.meta.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{author}</span>
                      <span className="mx-1">•</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{readTime}</span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Sections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Finance Card */}
            <div className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Finance</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Methodologies, analysis, and support decisions. Not theory-provoking.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                Explore →
              </a>
            </div>

            {/* Accounting Card */}
            <div className="bg-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Accounting</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Consolidation, policy choices, PSAK application, what you think, what you calculate.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700">
                Explore →
              </a>
            </div>

            {/* Green Transition Card */}
            <div className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Green Transition</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                The economics of decarbonization. Winners, who benefit, what can we do well.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                Explore →
              </a>
            </div>

            {/* The Next Big Thing Card */}
            <div className="bg-yellow-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">The Next Big Thing</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Arguing perspectives and opinions about future and world-view others.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700">
                Explore →
              </a>
            </div>

            {/* RJTS Preparation Card */}
            <div className="bg-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">RJTS Preparation</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Back to methodology. From accounting to complexity criteria.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                Explore →
              </a>
            </div>

            {/* Development Finance Card */}
            <div className="bg-cyan-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Development Finance</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Emerging econ, traditional finance, blended finance. How public capital shapes economies.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700">
                Explore →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex gap-6">
                <button className="pb-3 px-1 border-b-2 border-primary font-medium text-foreground">
                  Latest
                </button>
                <button className="pb-3 px-1 border-b-2 border-transparent font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Top
                </button>
                <button className="pb-3 px-1 border-b-2 border-transparent font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Discussions
                </button>
              </nav>
            </div>

            {/* Latest Posts List */}
            <div className="space-y-6">
              {latestPosts.docs.map((post) => {
                const postImage = post.meta?.image
                return (
                  <Link 
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="block group"
                  >
                    <article className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted">
                        {postImage && typeof postImage !== 'string' ? (
                          <Media 
                            resource={postImage} 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.meta?.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {post.meta.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {post.authors && Array.isArray(post.authors) && post.authors[0] && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              {typeof post.authors[0] === 'object' && post.authors[0].name}
                            </span>
                          )}
                          {post.publishedAt && (
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Author Card */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                    N
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Dika Gustiana</h3>
                    <p className="text-sm text-muted-foreground">
                      Thoughts on economics, history, and more
                    </p>
                  </div>
                </div>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>

              {/* Recommendations */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-foreground">Recommendations</h2>
                  <button className="text-sm text-primary hover:underline">
                    View all
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recommendedPosts.docs.slice(0, 5).map((post) => {
                    const postImage = post.meta?.image
                    return (
                      <Link 
                        key={post.id}
                        href={`/posts/${post.slug}`}
                        className="flex gap-3 group"
                      >
                        {/* Small icon/image */}
                        <div className="flex-shrink-0 w-10 h-10 rounded bg-muted overflow-hidden">
                          {postImage && typeof postImage !== 'string' ? (
                            <Media 
                              resource={postImage} 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <svg className="w-5 h-5 text-primary/40" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                          {post.authors && Array.isArray(post.authors) && post.authors[0] && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {typeof post.authors[0] === 'object' && post.authors[0].name}
                            </p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Home - Friendly Learning Buddy',
    description: 'Discover the latest posts and discussions',
  }
}
