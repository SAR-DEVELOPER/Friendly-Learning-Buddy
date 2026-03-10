import type { Metadata } from 'next/types'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ChapterAccordion } from '@/components/ChapterAccordion'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type SubcategoryKey =
  | 'fundamentals'
  | 'strategic-finance'
  | 'planning-and-forecasting'
  | 'financial-analytics'
  | 'capital-allocation'

const subcategoryConfig: Record<SubcategoryKey, { title: string; description: string }> = {
  fundamentals: {
    title: 'Fundamentals',
    description: 'Core concepts every finance professional must master.',
  },
  'strategic-finance': {
    title: 'Strategic Finance',
    description: 'Applied decision-making at CFO and board level.',
  },
  'planning-and-forecasting': {
    title: 'Planning and Forecasting',
    description: 'Translating Strategy into operational financial management.',
  },
  'financial-analytics': {
    title: 'Financial Analytics',
    description: 'Quantitative tools and diagnostic intelligence for finance professionals.',
  },
  'capital-allocation': {
    title: 'Capital Allocation',
    description:
      '15 recurring capital conditions observed in Indonesian markets. Institutional framework for allocators.',
  },
}

export async function generateStaticParams() {
  return Object.keys(subcategoryConfig).map((subcategory) => ({ subcategory }))
}

type Props = {
  params: Promise<{ subcategory: string }>
}

export default async function FinanceSubcategoryPage({ params }: Props) {
  const { subcategory } = await params

  if (!(subcategory in subcategoryConfig)) {
    return notFound()
  }

  const config = subcategoryConfig[subcategory as SubcategoryKey]
  const payload = await getPayload({ config: configPromise })

  // Fetch chapters for this subcategory, ordered by `order` ASC
  const chaptersResult = await payload.find({
    collection: 'chapters',
    where: { subcategory: { equals: subcategory } },
    sort: 'order',
    limit: 100,
    overrideAccess: false,
  })

  const chapters = chaptersResult.docs
  const chapterIds = chapters.map((ch) => ch.id)

  // Fetch all posts belonging to these chapters (include drafts for display)
  let allPosts: any[] = []
  let publishedCount = 0

  if (chapterIds.length > 0) {
    const postsResult = await payload.find({
      collection: 'posts',
      where: { chapter: { in: chapterIds } },
      overrideAccess: true,
      depth: 1,
      limit: 500,
      sort: 'createdAt',
    })
    allPosts = postsResult.docs

    // Count published posts
    const publishedResult = await payload.find({
      collection: 'posts',
      where: {
        and: [{ chapter: { in: chapterIds } }, { _status: { equals: 'published' } }],
      },
      overrideAccess: true,
      limit: 0,
    })
    publishedCount = publishedResult.totalDocs
  }

  const totalCount = allPosts.length

  // Group posts by chapter id
  const postsByChapter = new Map<string, typeof allPosts>()
  for (const chapterId of chapterIds) {
    postsByChapter.set(chapterId, [])
  }
  for (const post of allPosts) {
    const chapterId =
      post.chapter && typeof post.chapter === 'object' ? post.chapter.id : post.chapter
    if (chapterId && postsByChapter.has(chapterId)) {
      postsByChapter.get(chapterId)!.push(post)
    }
  }

  // Build structured chapters with their posts
  const chaptersWithPosts = chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    order: ch.order,
    posts: (postsByChapter.get(ch.id) || []).map((post) => ({
      id: post.id,
      title: post.title,
      subtitle: post.subtitle ?? null,
      slug: post.slug,
      _status: post._status ?? null,
      populatedAuthors: post.populatedAuthors ?? null,
    })),
  }))

  return (
    <div className="min-h-screen bg-background">
      <PageClient />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-4">
        <div className="max-w-4xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Finance', href: '/finance' },
            { label: config.title },
          ]}
        />
        </div>
      </div>

      {/* Header */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{config.title}</h1>
          <p className="text-lg text-muted-foreground leading-6 mb-4">{config.description}</p>
          <p className="text-sm text-blue-600 font-medium">
            {publishedCount} of {totalCount} essays published
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <ChapterAccordion chapters={chaptersWithPosts} />
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params

  if (!(subcategory in subcategoryConfig)) {
    return { title: 'Not Found' }
  }

  const config = subcategoryConfig[subcategory as SubcategoryKey]
  return {
    title: `${config.title} - Finance | Friendly Learning Buddy`,
    description: config.description,
  }
}
