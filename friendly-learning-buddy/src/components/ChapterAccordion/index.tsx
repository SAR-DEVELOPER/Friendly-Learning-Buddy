'use client'

import React, { useState } from 'react'
import Link from 'next/link'

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

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (chapters.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Belum ada chapter untuk subcategory ini.
      </p>
    )
  }

  return (
    <div className="divide-y divide-gray-200 border-t border-gray-200">
      {chapters.map((chapter) => {
        const isOpen = openIds.has(chapter.id)
        const orderStr = String(chapter.order).padStart(2, '0')
        const essayCount = chapter.posts.length

        return (
          <div key={chapter.id}>
            {/* Chapter header row */}
            <button
              type="button"
              onClick={() => toggle(chapter.id)}
              className="w-full flex items-center gap-4 py-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-mono text-muted-foreground w-8 flex-shrink-0">
                {orderStr}
              </span>
              <span className="flex-1 text-base font-semibold text-foreground">{chapter.title}</span>
              <span className="text-sm text-muted-foreground mr-4">
                {essayCount} {essayCount === 1 ? 'essay' : 'essays'}
              </span>
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
                            {authorName && (
                              <>
                                {' · '}
                                {authorName}
                              </>
                            )}
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
  )
}
