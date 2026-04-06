'use client'

import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { SearchIcon } from 'lucide-react'

type Item = {
  label: string
  href: string
}

type Props = {
  label: string
  items: Item[]
  href?: string
  hasSearch?: boolean
}

export const HeaderDropdown: React.FC<Props> = ({ label, items, href, hasSearch }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)

  const filtered = hasSearch && query.trim()
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : items

  const buttonContent = (
    <>
      <span>{label}</span>
      <svg
        className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </>
  )

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setQuery('') }}
    >
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          {buttonContent}
        </Link>
      ) : (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          {buttonContent}
        </button>
      )}

      {open && (
        <div className="absolute right-0 top-full pt-2 w-64 z-30">
          <div className="rounded-lg border border-white/20 bg-[#0f2744] shadow-xl shadow-black/20 p-2">
            {hasSearch && (
              <div className="flex items-center gap-2 px-2 py-1.5 mb-1 bg-white/5 rounded-md">
                <SearchIcon className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                  autoFocus
                />
              </div>
            )}
            <ul className="py-1">
              {filtered.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-white/40 italic">No results</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
