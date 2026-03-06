'use client'

import Link from 'next/link'
import React, { useState, useRef } from 'react'

type Item = {
  label: string
  href: string
}

type Props = {
  label: string
  items: Item[]
  href?: string
}

export const HeaderDropdown: React.FC<Props> = ({ label, items, href }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

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
      onMouseLeave={() => setOpen(false)}
    >
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
        >
          {buttonContent}
        </Link>
      ) : (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
        >
          {buttonContent}
        </button>
      )}

      {open && (
        <div className="absolute right-0 top-full pt-2 w-64 z-30">
          <div className="rounded-lg border border-white/20 bg-[#0f2744] shadow-xl shadow-black/20 p-2">
            <ul className="py-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

