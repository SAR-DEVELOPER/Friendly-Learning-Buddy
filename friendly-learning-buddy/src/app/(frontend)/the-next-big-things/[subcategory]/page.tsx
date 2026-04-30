import type { Metadata } from 'next/types'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { ChapterAccordion } from '@/components/ChapterAccordion'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

type SubcategoryKey = 'technology' | 'economy' | 'society' | 'environment' | 'governance'

const subcategoryConfig: Record<SubcategoryKey, { title: string; description: string }> = {
  technology: {
    title: 'Technology',
    description: 'Emerging technologies reshaping industries, economies, and daily life.',
  },
  economy: {
    title: 'Economy',
    description: 'New economic models, shifting trade patterns, and the future of work and wealth.',
  },
  society: {
    title: 'Society',
    description: 'Social transformation, demographic shifts, and changing human behavior at scale.',
  },
  environment: {
    title: 'Environment',
    description: 'Climate science, resource constraints, and the economics of environmental change.',
  },
  governance: {
    title: 'Governance',
    description: 'New models of political governance, regulation, and institutional design.',
  },
}

type Props = { params: Promise<{ subcategory: string }> }

export default async function NextBigThingsSubcategoryPage({ params }: Props) {
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
      where: { and: [{ chapter: { in: chapterIds } }, { _status: { equals: 'published' } }] },
      overrideAccess: true,
      limit: 0,
    })
    publishedCount = publishedResult.totalDocs
  }

  const postsByChapter = new Map<string, typeof allPosts>()
  for (const chapterId of chapterIds) postsByChapter.set(chapterId, [])
  for (const post of allPosts) {
    const chapterId = post.chapter && typeof post.chapter === 'object' ? post.chapter.id : post.chapter
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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'The Next Big Things' }, { label: config.title }]} />
        </div>
      </div>
      <section className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{config.title}</h1>
          <p className="text-lg text-muted-foreground leading-6 mb-4">{config.description}</p>
          <p className="text-sm text-blue-600 font-medium">
            {publishedCount} of {allPosts.length} essays published
          </p>
        </div>
      </section>
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
    title: `${config.title} - The Next Big Things | Friendly Learning Buddy`,
    description: config.description,
  }
}
