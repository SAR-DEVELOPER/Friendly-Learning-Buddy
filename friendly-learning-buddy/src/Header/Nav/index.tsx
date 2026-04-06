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
        href="/the-next-big-things"
        items={[
          { label: 'Technology', href: '/search?q=Next%20Big%20Things%20Technology' },
          { label: 'Economy', href: '/search?q=Next%20Big%20Things%20Economy' },
          { label: 'Society', href: '/search?q=Next%20Big%20Things%20Society' },
          { label: 'Environment', href: '/search?q=Next%20Big%20Things%20Environment' },
          { label: 'Governance', href: '/search?q=Next%20Big%20Things%20Governance' },
        ]}
      />
      <HeaderDropdown
        label="Development Finance"
        href="/development-finance"
        items={[
          { label: 'Sovereign Wealth Funds', href: '/search?q=Next%20Big%20Things%20Technology' },
          { label: 'Multilateral Development Banks', href: '/search?q=Next%20Big%20Things%20Economy' },
          { label: 'Blended Finance', href: '/search?q=Next%20Big%20Things%20Society' },
          { label: 'Indonesia Capital Architecture', href: '/search?q=Next%20Big%20Things%20Environment' },
        ]}
      />
      <HeaderDropdown
        label="Learning"
        href="/learning"
        items={[
          { label: 'Critical Thinking', href: '/search?q=Critical%20Thinking' },
          { label: 'Books', href: '/search?q=Books' },
          { label: 'IELTS', href: '/search?q=IELTS' },
        ]}
      />

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-white hover:opacity-90 transition-opacity" />
      </Link>
    </nav>
  )
}
