export type HeadingItem = {
  id: string
  text: string
  level: 'h2' | 'h3'
}

export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractText(node: any): string {
  if (node.type === 'text') return node.text || ''
  if (Array.isArray(node.children)) return node.children.map(extractText).join('')
  return ''
}

export function extractHeadings(content: any): HeadingItem[] {
  const children = content?.root?.children
  if (!Array.isArray(children)) return []

  return children
    .filter((node: any) => node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3'))
    .map((node: any) => {
      const text = extractText(node)
      return { id: generateHeadingId(text), text, level: node.tag as 'h2' | 'h3' }
    })
    .filter((h: HeadingItem) => h.text.length > 0)
}
