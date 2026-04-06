'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SearchIcon, X } from 'lucide-react'

type PostItem = {
  id: string
  title: string
  subtitle?: string | null
  slug: string
  _status?: 'published' | 'draft' | null
  populatedAuthors?: Array<{ id?: string | null; name?: string | null }> | null
}

type ChapterWithPosts = {
  id: string
  title: string
  order: number
  posts: PostItem[]
}

type Props = {
  chapters: ChapterWithPosts[]
}

export const ChapterAccordion: React.FC<Props> = ({ chapters }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(chapters.length > 0 ? [chapters[0].id] : []),
  )
  const [query, setQuery] = useState('')

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isSearching = query.trim().length > 0
  const q = query.toLowerCase()

  // When searching: filter posts inside each chapter, show only chapters with matches
  const visibleChapters = chapters
    .map((chapter) => ({
      ...chapter,
      posts: isSearching
        ? chapter.posts.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              (p.subtitle ?? '').toLowerCase().includes(q),
          )
        : chapter.posts,
    }))
    .filter((chapter) => !isSearching || chapter.posts.length > 0)

  return (
    <div>
      {/* Search bar — always visible */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search essays..."
          className="w-full pl-9 pr-9 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition"
        />
        {isSearching && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Empty state */}
      {chapters.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Belum ada chapter untuk subcategory ini.
        </p>
      ) : isSearching && visibleChapters.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No essays found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {visibleChapters.map((chapter) => {
            const isOpen = isSearching || openIds.has(chapter.id)
            const orderStr = String(chapter.order).padStart(2, '0')
            const essayCount = chapter.posts.length

            return (
              <div key={chapter.id}>
                {/* Chapter header row */}
                <button
                  type="button"
                  onClick={() => !isSearching && toggle(chapter.id)}
                  className={`w-full flex items-center gap-4 py-5 text-left transition-colors ${!isSearching ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="text-sm font-mono text-muted-foreground w-8 flex-shrink-0">
                    {orderStr}
                  </span>
                  <span className="flex-1 text-base font-semibold text-foreground">
                    {chapter.title}
                  </span>
                  <span className="text-sm text-muted-foreground mr-4">
                    {essayCount} {essayCount === 1 ? 'essay' : 'essays'}
                  </span>
                  {!isSearching && (
                    <svg
                      className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>

                {/* Posts list */}
                {isOpen && (
                  <div className="pb-4 pl-12 pr-4 space-y-5">
                    {chapter.posts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Belum ada post di chapter ini.</p>
                    ) : (
                      chapter.posts.map((post) => {
                        const isDraft = post._status !== 'published'
                        const authorName =
                          post.populatedAuthors && post.populatedAuthors.length > 0
                            ? post.populatedAuthors[0]?.name
                            : null

                        return (
                          <div key={post.id} className="group">
                            <Link href={`/posts/${post.slug}`} className="block">
                              <h3 className="text-sm font-semibold text-foreground group-hover:text-blue-600 transition-colors leading-snug">
                                {post.title}
                              </h3>
                              {post.subtitle && (
                                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                                  {post.subtitle}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {isDraft ? 'Draft' : 'Published'}
                                {authorName && <>{' · '}{authorName}</>}
                              </p>
                            </Link>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
