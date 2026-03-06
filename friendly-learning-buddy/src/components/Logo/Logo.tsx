import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className={clsx('h-[34px]', className)}>
      {/* eslint-disable @next/next/no-img-element */}
      {/* Light mode logo */}
      <img
        alt="Friendly Learning Buddy logo"
        width={193}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-full w-auto block dark:hidden"
        src="/media/logo/FLB-alt.png"
      />
      {/* Dark mode logo */}
      <img
        alt="Friendly Learning Buddy logo"
        width={193}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-full w-auto hidden dark:block"
        src="/media/logo/FLB-alt.png"
      />
    </div>
  )
}
