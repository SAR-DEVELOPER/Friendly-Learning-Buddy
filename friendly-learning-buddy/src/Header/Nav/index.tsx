'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { HeaderDropdown } from '@/Header/Dropdown'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center [&>a]:text-white [&>a]:font-medium [&>a]:hover:opacity-90 [&>a]:transition-colors [&>a]:underline-offset-4 [&>a:hover]:underline">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}

      {/* Topic dropdowns */}
      <HeaderDropdown
        label="Accounting"
        href="/accounting"
        items={[
          { label: 'FLSI Detail', href: '/accounting/FLSI' },
          { label: 'Consolidated Recording', href: '/search?q=Consolidated%20Recording' },
          { label: 'Statutory Reporting', href: '/search?q=Statutory%20Reporting' },
        ]}
      />
      <HeaderDropdown
        label="Finance"
        href="/finance"
        items={[
          { label: 'Fundamentals', href: '/finance/fundamentals' },
          { label: 'Strategic Finance', href: '/finance/strategic-finance' },
          { label: 'Planning and Forecasting', href: '/finance/planning-and-forecasting' },
          { label: 'Financial Analytics', href: '/finance/financial-analytics' },
          { label: 'Capital Allocation', href: '/finance/capital-allocation' },
          { label: 'Finance in Action', href: '/finance/finance-in-action' },
        ]}
      />
      <HeaderDropdown
        label="The Green Transition"
        href="/green-transition"
        items={[
          { label: 'Where We Are Now', href: '/green-transition/where-we-are' },
          { label: 'Challenges Ahead', href: '/green-transition/challenges' },
          { label: 'Pathways Forward', href: '/green-transition/pathways' },
          { label: 'Climate Finance', href: '/green-transition/climate-finance' },
        ]}
      />
      <HeaderDropdown
        label="The Next Big Things"
        items={[
          { label: 'Technology', href: '/the-next-big-things/technology' },
          { label: 'Economy', href: '/the-next-big-things/economy' },
          { label: 'Society', href: '/the-next-big-things/society' },
          { label: 'Environment', href: '/the-next-big-things/environment' },
          { label: 'Governance', href: '/the-next-big-things/governance' },
        ]}
      />
      <HeaderDropdown
        label="Development Finance"
        items={[
          { label: 'Sovereign Wealth Funds', href: '/development-finance/sovereign-wealth-funds' },
          { label: 'Multilateral Development Banks', href: '/development-finance/multilateral-development-banks' },
          { label: 'Blended Finance', href: '/development-finance/blended-finance' },
          { label: 'Indonesia Capital Architecture', href: '/development-finance/indonesia-capital-architecture' },
        ]}
      />
      <HeaderDropdown
        label="Learning"
        items={[
          { label: 'Critical Thinking', href: '/learning/critical-thinking' },
          { label: 'Books', href: '/learning/books' },
          { label: 'IELTS', href: '/learning/ielts' },
        ]}
      />

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-white hover:opacity-90 transition-opacity" />
      </Link>
    </nav>
  )
}
