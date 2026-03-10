import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Chapters: CollectionConfig = {
  slug: 'chapters',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subcategory', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Urutan chapter (1, 2, 3, ...). Digunakan untuk menentukan nomor 01, 02, 03 pada halaman.',
      },
    },
    {
      name: 'subcategory',
      type: 'select',
      required: true,
      options: [
        { label: 'Fundamentals', value: 'fundamentals' },
        { label: 'Strategic Finance', value: 'strategic-finance' },
        { label: 'Planning and Forecasting', value: 'planning-and-forecasting' },
        { label: 'Financial Analytics', value: 'financial-analytics' },
        { label: 'Capital Allocation', value: 'capital-allocation' },
        { label: 'Finance in Action', value: 'finance-in-action' },
      ],
    },
    slugField({
      position: undefined,
    }),
  ],
}
