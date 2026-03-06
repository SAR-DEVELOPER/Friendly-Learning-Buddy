import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold">
                F
              </div>
              <span className="font-semibold text-gray-900">Friendly learning buddy</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Finance, accounting, and sustainability economics. Research and analysis.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Dika Gustiana (team), LinkedIn</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>dikagus.idea@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Sections Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Accounting</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Finance</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Green Transition</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">The Next Big Thing</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900 transition-colors">RJTS Preparation</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Books</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition-colors">Learning</Link></li>
            </ul>
          </div>

          {/* Empty Column for spacing */}
          <div></div>
        </div>
      </div>
    </footer>
  )
}
