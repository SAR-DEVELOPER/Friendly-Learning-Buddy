import type { Metadata } from 'next/types'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ChapterAccordion } from '@/components/ChapterAccordion'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

type SubcategoryKey = 'where-we-are' | 'challenges' | 'pathways' | 'climate-finance'

const subcategoryConfig: Record<SubcategoryKey, { title: string; description: string }> = {
  'where-we-are': {
    title: 'Where We Are Now',
    description:
      'Current energy mix, emissions profile, existing policies, and the gap between climate commitments and economic reality.',
  },
  challenges: {
    title: 'Challenges Ahead',
    description:
      'The hard problems: stranded assets, grid stability, financing gaps, SME challenges, and the politics of transition costs.',
  },
  pathways: {
    title: 'Pathways Forward',
    description:
      'What might actually work: sector priorities, policy mechanisms, financing structures, and realistic timelines.',
  },
  'climate-finance': {
    title: 'Climate Finance',
    description:
      'The instruments, institutions, and capital flows that fund the green transition. Green bonds, carbon markets, and climate-aligned lending.',
  },
}

type Props = {
  params: Promise<{ subcategory: string }>
}

export default async function GreenTransitionSubcategoryPage({ params }: Props) {
  const { subcategory } = await params

  if (!(subcategory in subcategoryConfig)) return notFound()

  const config = subcategoryConfig[subcategory as SubcategoryKey]
  const payload = await getPayload({ config: configPromise })

  const chaptersResult = await payload.find({
    collection: 'chapters',
    where: { subcategory: { equals: subcategory } },
    sort: 'order',
    limit: 100,
    overrideAccess: false,
  })

  const chapters = chaptersResult.docs
  const chapterIds = chapters.map((ch) => ch.id)

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

  const postsByChapter = new Map<string, typeof allPosts>()
  for (const chapterId of chapterIds) postsByChapter.set(chapterId, [])
  for (const post of allPosts) {
    const chapterId =
      post.chapter && typeof post.chapter === 'object' ? post.chapter.id : post.chapter
    if (chapterId && postsByChapter.has(chapterId)) postsByChapter.get(chapterId)!.push(post)
  }

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
              { label: 'The Green Transition', href: '/green-transition' },
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

      {/* Chapters with search */}
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
  if (!(subcategory in subcategoryConfig)) return { title: 'Not Found' }
  const config = subcategoryConfig[subcategory as SubcategoryKey]
  return {
    title: `${config.title} - The Green Transition | Friendly Learning Buddy`,
    description: config.description,
  }
}
