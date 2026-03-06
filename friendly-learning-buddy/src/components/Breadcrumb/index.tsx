import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
  showHome?: boolean
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  separator,
  showHome = true,
}) => {
  const defaultSeparator = (
    <svg
      className="w-4 h-4 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  const homeItem: BreadcrumbItem = { label: 'Home', href: '/' }
  const breadcrumbItems = showHome ? [homeItem, ...items] : items

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center bg-gray-200 p-4 rounded-lg', className)}>
      <ol className="flex items-center gap-2 flex-wrap">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'text-sm',
                    isLast ? 'text-foreground font-medium' : 'text-muted-foreground',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="flex items-center" aria-hidden="true">
                  {separator || defaultSeparator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
