'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import type { HeadingItem } from '@/utilities/headings'

type Group = {
  heading: HeadingItem
  items: HeadingItem[]
}

function buildGroups(headings: HeadingItem[]): Group[] {
  const groups: Group[] = []
  let current: Group | null = null

  for (const h of headings) {
    if (h.level === 'h2') {
      current = { heading: h, items: [] }
      groups.push(current)
    } else if (h.level === 'h3') {
      if (!current) {
        // h3 with no parent h2 — create an unnamed group
        current = { heading: { id: '__root__', text: '', level: 'h2' }, items: [] }
        groups.push(current)
      }
      current.items.push(h)
    }
  }

  return groups
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  const allIds = headings.map((h) => h.id)

  function navigate(dir: 'up' | 'down') {
    const idx = allIds.indexOf(activeId)
    const next = dir === 'down' ? idx + 1 : idx - 1
    if (next >= 0 && next < allIds.length) scrollTo(allIds[next])
  }

  const groups = buildGroups(headings)

  const filtered = search.trim()
    ? headings.filter((h) => h.text.toLowerCase().includes(search.toLowerCase()))
    : null

  return (
    <nav className="w-64 text-sm">
      <p className="font-semibold mb-3 text-foreground">On this page</p>

      {/* Search */}
      <div className="relative mb-3">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Find in page..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-md py-1.5 pl-7 pr-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-border"
        />
      </div>

      {/* Up / Down navigation */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => navigate('down')}
          className="flex-1 flex items-center justify-center border rounded-md py-1 hover:bg-muted transition-colors"
          aria-label="Next section"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => navigate('up')}
          className="flex-1 flex items-center justify-center border rounded-md py-1 hover:bg-muted transition-colors"
          aria-label="Previous section"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Filtered flat list */}
      {filtered ? (
        <ul className="space-y-1">
          {filtered.map((h) => (
            <li key={h.id}>
              <button
                onClick={() => scrollTo(h.id)}
                className={cn(
                  'w-full text-left text-muted-foreground hover:text-foreground transition-colors',
                  h.level === 'h3' && 'pl-3',
                  activeId === h.id && 'font-semibold text-foreground',
                )}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        /* Grouped list */
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.heading.id}>
              {/* H2 group header */}
              {group.heading.text && (
                <div className="flex items-center justify-between mb-1">
                  <button
                    onClick={() => scrollTo(group.heading.id)}
                    className={cn(
                      'text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors',
                      activeId === group.heading.id && 'text-foreground',
                    )}
                  >
                    {group.heading.text}
                  </button>
                  {group.items.length > 0 && (
                    <button
                      onClick={() =>
                        setCollapsed((p) => ({ ...p, [group.heading.id]: !p[group.heading.id] }))
                      }
                      className="text-muted-foreground hover:text-foreground ml-1"
                      aria-label="Toggle section"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={cn(
                          'transition-transform',
                          collapsed[group.heading.id] && 'rotate-180',
                        )}
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* H3 items */}
              {!collapsed[group.heading.id] && group.items.length > 0 && (
                <ul className="space-y-1 border-l pl-3">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={cn(
                          'w-full text-left text-muted-foreground hover:text-foreground transition-colors leading-snug py-0.5',
                          activeId === item.id && 'font-semibold text-foreground',
                        )}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* H2-only (no h3 children) */}
              {!group.heading.text && group.items.length > 0 && (
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={cn(
                          'w-full text-left text-muted-foreground hover:text-foreground transition-colors',
                          activeId === item.id && 'font-semibold text-foreground',
                        )}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}
