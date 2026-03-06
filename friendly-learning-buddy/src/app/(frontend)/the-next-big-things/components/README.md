# PostsList Component

A flexible component that displays posts in either **Grid View** or **List View** with a toggle button.

## Features

### View Modes

#### Grid View (Default)
- 3-column responsive grid (1 → 2 → 3 columns)
- Image on top, content below
- Compact card layout
- Fixed 16:10 aspect ratio images

#### List View
- Full-width horizontal cards
- Image on the left (square aspect ratio on desktop)
- Content on the right with more space
- Better for detailed reading

### Toggle Button
- Grid icon: Shows grid view
- List icon: Shows list view
- Active state: Dark background
- Smooth transitions between views

## Usage

```tsx
import { PostsList } from './components/PostsList'

// Basic usage
<PostsList posts={posts} />

// With view toggle enabled (default)
<PostsList posts={posts} showViewToggle={true} />

// Start in list view
<PostsList posts={posts} initialView="list" />

// Without view toggle
<PostsList posts={posts} showViewToggle={false} />
```

## Post Card Content

Both views display:
- **Category tag** (uppercase, small text)
- **Title** (bold, 2-line clamp)
- **Description** (gray text, 2-3 line clamp)
- **Meta information**:
  - 👤 Author name
  - 📅 Published date (formatted)
  - ⏱️ Estimated read time

## List View Layout

```
┌─────────────────────────────────────────────────┐
│ ┌─────────┐  Category Tag                      │
│ │         │  Post Title Here                   │
│ │  Image  │  Post description goes here with   │
│ │ (left)  │  more details visible...           │
│ │         │  👤 Author  📅 Date  ⏱️ 8 min read │
│ └─────────┘                                     │
└─────────────────────────────────────────────────┘
```

## Grid View Layout

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Image   │  │  Image   │  │  Image   │
├──────────┤  ├──────────┤  ├──────────┤
│ Category │  │ Category │  │ Category │
│ Title    │  │ Title    │  │ Title    │
│ Desc...  │  │ Desc...  │  │ Desc...  │
│ 👤📅⏱️   │  │ 👤📅⏱️   │  │ 👤📅⏱️   │
└──────────┘  └──────────┘  └──────────┘
```

## Responsive Behavior

### Grid View
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### List View
- Mobile: Stacked (image top, content bottom)
- Desktop: Horizontal (image left, content right)
- Image width: 256px (16rem) on desktop

## Image Handling

- **Grid View**: 16:10 aspect ratio
- **List View**: Square aspect ratio on desktop, 16:10 on mobile
- **Missing Images**: Gray placeholder with image icon
- **Hover Effect**: 105% scale with smooth transition

## State Management

Uses React `useState` hook to manage view mode:
```tsx
const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView)
```

State persists during user session but resets on page refresh.
