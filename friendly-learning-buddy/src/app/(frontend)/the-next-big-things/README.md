# The Next Big Things - News Section

This page serves as a news-like section displaying posts across 5 main categories:
- Technology 💻
- Economy 📈
- Society 👥
- Environment 🌍
- Governance ⚖️

## Current Features

### 1. Hot Now Section
Displays the 3 most recent published posts with numbered badges (1, 2, 3).

### 2. Category Sections
Each of the 5 categories displays up to 6 recent posts in a grid layout.

### 3. Category Navigation
Sticky navigation bar with category tabs for filtering (links prepared for client-side filtering).

## Data Flow

```typescript
// Fetches hot posts
const hotPosts = await payload.find({
  collection: 'posts',
  depth: 2,
  limit: 3,
  sort: '-publishedAt',
  where: { _status: { equals: 'published' } }
})

// Fetches posts by category
const postsByCategory = await Promise.all(
  CATEGORIES.map(async (category) => {
    // Find matching category in database
    const categoryDoc = categoriesData.docs.find(...)
    
    // Fetch posts with that category
    const posts = await payload.find({
      collection: 'posts',
      where: {
        categories: { contains: categoryDoc.id },
        _status: { equals: 'published' }
      }
    })
  })
)
```

## Next Steps to Build On

### 1. Add Client-Side Category Filtering
Create a new component to handle URL params and filter displayed posts:

```typescript
// In a new CategoryFilter component
'use client'
const searchParams = useSearchParams()
const selectedCategory = searchParams.get('category')
// Filter and display posts based on selectedCategory
```

### 2. Add Tag System
Extend the Posts collection to include tags:

```typescript
// In src/collections/Posts/index.ts
{
  name: 'tags',
  type: 'array',
  fields: [
    {
      name: 'tag',
      type: 'text',
    }
  ]
}
```

Then display tags on cards and create tag filtering.

### 3. Add Search Functionality
Implement a search bar that queries posts by title/content:

```typescript
const searchResults = await payload.find({
  collection: 'posts',
  where: {
    or: [
      { title: { contains: searchQuery } },
      { 'meta.description': { contains: searchQuery } }
    ]
  }
})
```

### 4. Add Trending/Popular Section
Track post views and display most popular posts:
- Add a `views` field to Posts collection
- Create an API endpoint to increment views
- Query by most views in a time period

### 5. Add Pagination
For each category section, add "Load More" or pagination:

```typescript
const posts = await payload.find({
  collection: 'posts',
  page: pageNumber,
  limit: 6,
  // ... other params
})
```

### 6. Add Date Filtering
Add filters for "Today", "This Week", "This Month", "All Time":

```typescript
const startDate = new Date()
startDate.setDate(startDate.getDate() - 7) // Last 7 days

where: {
  publishedAt: {
    greater_than: startDate.toISOString()
  }
}
```

### 7. Add RSS Feed
Create an RSS feed endpoint for the news section.

## Database Requirements

Make sure you have these categories created in your Payload CMS:
1. Technology
2. Economy
3. Society
4. Environment
5. Governance

You can create them via the admin panel at `/admin/collections/categories`.

## Styling Notes

- Uses Tailwind CSS with gray-scale design
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Card component handles post display with image, title, description, and categories
- Sticky category navigation for easy filtering while scrolling
