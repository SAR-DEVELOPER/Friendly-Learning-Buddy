'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X, SearchIcon, ChevronDown } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

const mobileMenuSections = [
  {
    label: 'Accounting',
    href: '/accounting',
    items: [
      { label: 'FLSI Detail', href: '/accounting/FLSI' },
      { label: 'Consolidated Recording', href: '/search?q=Consolidated%20Recording' },
      { label: 'Statutory Reporting', href: '/search?q=Statutory%20Reporting' },
    ],
  },
  {
    label: 'Finance',
    href: '/finance',
    items: [
      { label: 'Fundamentals', href: '/finance/fundamentals' },
      { label: 'Strategic Finance', href: '/finance/strategic-finance' },
      { label: 'Planning and Forecasting', href: '/finance/planning-and-forecasting' },
      { label: 'Financial Analytics', href: '/finance/financial-analytics' },
      { label: 'Capital Allocation', href: '/finance/capital-allocation' },
      { label: 'Finance in Action', href: '/finance/finance-in-action' },
    ],
  },
  {
    label: 'The Green Transition',
    href: '/green-transition',
    items: [
      { label: 'Where Are We Now', href: '/search?q=Green%20Transition%20Where%20Are%20We%20Now' },
      { label: 'Challenges Ahead', href: '/search?q=Green%20Transition%20Challenges%20Ahead' },
      { label: 'Pathway Forward', href: '/search?q=Green%20Transition%20Pathway%20Forward' },
    ],
  },
  {
    label: 'The Next Big Things',
    href: '/the-next-big-things',
    items: [
      { label: 'Technology', href: '/search?q=Next%20Big%20Things%20Technology' },
      { label: 'Economy', href: '/search?q=Next%20Big%20Things%20Economy' },
      { label: 'Society', href: '/search?q=Next%20Big%20Things%20Society' },
      { label: 'Environment', href: '/search?q=Next%20Big%20Things%20Environment' },
      { label: 'Governance', href: '/search?q=Next%20Big%20Things%20Governance' },
    ],
  },
  {
    label: 'Development Finance',
    href: '/development-finance',
    items: [
      { label: 'Sovereign Wealth Funds', href: '/search?q=Sovereign%20Wealth%20Funds' },
      { label: 'Multilateral Development Banks', href: '/search?q=Multilateral%20Development%20Banks' },
      { label: 'Blended Finance', href: '/search?q=Blended%20Finance' },
      { label: 'Indonesia Capital Architecture', href: '/search?q=Indonesia%20Capital%20Architecture' },
    ],
  },
  {
    label: 'Learning',
    href: '/learning',
    items: [
      { label: 'Critical Thinking', href: '/search?q=Critical%20Thinking' },
      { label: 'Books', href: '/search?q=Books' },
      { label: 'IELTS', href: '/search?q=IELTS' },
    ],
  },
]

function MobileSection({ section, onClose }: { section: typeof mobileMenuSections[0]; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between px-4 py-4 text-white font-medium text-left"
        onClick={() => setOpen(!open)}
      >
        <span>{section.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-2">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-8 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="relative z-20 w-full bg-[#0a1628] text-white dark"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="px-6 md:px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white shrink-0">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden min-[1355px]:flex">
            <HeaderNav data={data} />
          </div>

          {/* Mobile: Search + Hamburger */}
          <div className="flex items-center gap-3 max-[1354px]:flex min-[1355px]:hidden">
            <Link href="/search" className="text-white">
              <span className="sr-only">Search</span>
              <SearchIcon className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0a1628] overflow-y-auto min-[1355px]:hidden" style={{ top: 0 }}>
          {/* Header in overlay */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
            <Link href="/" className="text-white shrink-0" onClick={() => setMenuOpen(false)}>
              <Logo loading="eager" priority="high" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-white p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Static links (Posts, Contact) */}
          <div className="border-b border-white/10">
            {(data?.navItems || []).map(({ link }, i) => (
              <Link
                key={i}
                href={(link as any)?.url || '#'}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-4 text-white font-medium border-b border-white/10 last:border-0"
              >
                {(link as any)?.label || ''}
              </Link>
            ))}
          </div>

          {/* Dropdown sections */}
          {mobileMenuSections.map((section) => (
            <MobileSection key={section.href} section={section} onClose={() => setMenuOpen(false)} />
          ))}
        </div>
      )}
    </>
  )
}
