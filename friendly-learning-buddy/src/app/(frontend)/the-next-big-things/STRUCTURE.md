# The Next Big Things - Page Structure

## Layout Overview

```
┌─────────────────────────────────────────────────────┐
│ Breadcrumb: The Next Big Things                     │
├─────────────────────────────────────────────────────┤
│ Category Tabs (Sticky)                              │
│ [All Topics] [💻 Technology] [📈 Economy]           │
│ [👥 Society] [🌍 Environment] [⚖️ Governance]       │
├─────────────────────────────────────────────────────┤
│ Hero Image + Title                                  │
│ "What's the next big thing..."                      │
├─────────────────────────────────────────────────────┤
│ Quote Section (Gray Background)                     │
│ "This is an ideas laboratory..."                    │
├─────────────────────────────────────────────────────┤
│ Essays & Analysis Header                            │
│ "Explorations of technology shifts..."              │
├─────────────────────────────────────────────────────┤
│ Filter Bar                                          │
│ [Search Title] [Topic Dropdown] [Sort Dropdown]     │
├─────────────────────────────────────────────────────┤
│ Hot Now Section (5-8 posts)                         │
│ 🔥 Hot Now ─────────────────────────                │
│ [1] [2] [3]                                         │
│ [4] [5] [6]                                         │
│ [7] [8]                                             │
├─────────────────────────────────────────────────────┤
│ 💻 Technology Section                               │
│ [Post] [Post] [Post]                                │
│ [Post] [Post] [Post]                                │
├─────────────────────────────────────────────────────┤
│ 📈 Economy Section                                  │
│ [Post] [Post] [Post]                                │
├─────────────────────────────────────────────────────┤
│ 👥 Society Section                                  │
│ [Post] [Post] [Post]                                │
├─────────────────────────────────────────────────────┤
│ 🌍 Environment Section                              │
│ [Post] [Post] [Post]                                │
├─────────────────────────────────────────────────────┤
│ ⚖️ Governance Section                               │
│ [Post] [Post] [Post]                                │
└─────────────────────────────────────────────────────┘
```

## Post Card Details

Each post card now includes:

### Visual Elements
- **Fixed Image Ratio**: `aspect-[16/10]` (16:10 ratio)
- **Image Placeholder**: Gray background with icon for missing images
- **Hover Effect**: Image scales up 105% on hover
- **Shadow**: Card shadow increases on hover

### Content Elements
1. **Category Tag** (top)
   - Small, uppercase text
   - Shows all categories the post belongs to
   
2. **Title**
   - Large, bold font
   - 2-line clamp (truncates with ellipsis)
   
3. **Description**
   - Smaller gray text
   - 2-line clamp
   - Only in category sections (not Hot Now)
   
4. **Meta Information** (bottom)
   - 👤 **Author**: Name from `populatedAuthors`
   - 📅 **Date**: Formatted publish date (e.g., "Mar 5, 2026")
   - ⏱️ **Read Time**: Estimated reading time in minutes

## Data Fetching

### Hot Now Posts
```typescript
limit: 8
sort: '-publishedAt'  // Most recent first
where: { _status: 'published' }
```

### Category Posts
```typescript
limit: 6 per category
sort: '-publishedAt'
where: {
  categories: { contains: categoryDoc.id },
  _status: 'published'
}
```

## Image Consistency

All images use:
- `aspect-[16/10]`: Fixed aspect ratio
- `object-cover`: Crops to fit container
- `fill`: Next.js Image fill mode
- No gray bars or layout shifts

## Filter Bar (Static - Ready for Enhancement)

Current filters (non-functional, UI only):
1. **Search Title**: Text input
2. **Topic**: Dropdown with 5 categories
3. **Sort By**: Newest/Oldest/Title A-Z/Z-A

To make functional, see README.md for implementation guide.

## Responsive Breakpoints

- **Mobile**: 1 column
- **Tablet (md)**: 2 columns
- **Desktop (lg)**: 3 columns
- **Hot Now**: 1 → 2 → 3 columns

## Color Scheme

- Primary text: `text-gray-900`
- Secondary text: `text-gray-600`
- Meta text: `text-gray-500`
- Borders: `border-gray-200`
- Backgrounds: `bg-white`, `bg-gray-50`, `bg-gray-100`
- Accent: `text-red-500` (Hot Now icon, badges)
