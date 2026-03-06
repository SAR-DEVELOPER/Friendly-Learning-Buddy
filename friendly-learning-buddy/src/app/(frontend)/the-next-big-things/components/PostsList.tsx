'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/payload-types'

type PostData = Pick<Post, 'id' | 'slug' | 'title' | 'categories' | 'meta' | 'publishedAt' | 'populatedAuthors'>

interface PostsListProps {
  posts: PostData[]
  showViewToggle?: boolean
  initialView?: 'grid' | 'list'
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  technology: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  economy: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  society: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  environment: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  governance: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  default: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
}

const getCategoryColor = (categoryTitle: string) => {
  const normalized = categoryTitle.toLowerCase()
  return CATEGORY_COLORS[normalized] || CATEGORY_COLORS.default
}

export const PostsList: React.FC<PostsListProps> = ({ 
  posts, 
  showViewToggle = true,
  initialView = 'grid' 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView)

  const renderPost = (post: PostData, index?: number) => {
    const { slug, categories, meta, title, publishedAt, populatedAuthors } = post
    const { description, image: metaImage } = meta || {}
    const href = `/posts/${slug}`

    // Calculate estimated read time
    const wordCount = description ? description.split(' ').length : 0
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    // Format date
    const formattedDate = publishedAt 
      ? new Date(publishedAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      : 'Invalid Date'

    // Get author name
    const authorName = populatedAuthors && populatedAuthors.length > 0 
      ? populatedAuthors[0].name 
      : 'Anonymous'

    if (viewMode === 'list') {
      return (
        <Link 
          key={post.id}
          href={href}
          className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image on the left */}
            <div className="relative w-full sm:w-64 aspect-[16/10] sm:aspect-square bg-gray-100 overflow-hidden flex-shrink-0">
              {metaImage && typeof metaImage !== 'string' && metaImage.url ? (
                <Image
                  src={metaImage.url}
                  alt={title || 'Post image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {typeof index === 'number' && (
                <div className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>
              )}
            </div>

            {/* Content on the right */}
            <div className="flex-1 p-4 sm:p-6">
              {/* Categories */}
              {categories && Array.isArray(categories) && categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((cat, idx) => {
                    if (typeof cat === 'object' && cat.title) {
                      const colors = getCategoryColor(cat.title)
                      return (
                        <span 
                          key={idx}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {cat.title}
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                {title}
              </h3>

              {/* Description */}
              {description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {description.replace(/\s/g, ' ')}
                </p>
              )}

              {/* Meta information */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {/* Author */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{authorName}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formattedDate}</span>
                </div>

                {/* Read time */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )
    }

    // Grid view (default)
    return (
      <Link 
        key={post.id}
        href={href}
        className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
      >
        {/* Fixed aspect ratio image container */}
        <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
          {metaImage && typeof metaImage !== 'string' && metaImage.url ? (
            <Image
              src={metaImage.url}
              alt={title || 'Post image'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {typeof index === 'number' && (
            <div className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
              {index + 1}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Categories */}
          {categories && Array.isArray(categories) && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat, idx) => {
                if (typeof cat === 'object' && cat.title) {
                  const colors = getCategoryColor(cat.title)
                  return (
                    <span 
                      key={idx}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {cat.title}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {title}
          </h4>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {description.replace(/\s/g, ' ')}
            </p>
          )}

          {/* Meta information */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {/* Author */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{authorName}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>

            {/* Read time */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div>
      {/* View Toggle */}
      {showViewToggle && (
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Posts Container */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'flex flex-col gap-6'
      }>
        {posts.map((post, index) => renderPost(post, index))}
      </div>
    </div>
  )
}
