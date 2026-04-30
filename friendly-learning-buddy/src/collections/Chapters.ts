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
        { label: 'FLSI (Accounting)', value: 'flsi' },
        { label: 'Where We Are Now (Green Transition)', value: 'where-we-are' },
        { label: 'Challenges Ahead (Green Transition)', value: 'challenges' },
        { label: 'Pathways Forward (Green Transition)', value: 'pathways' },
        { label: 'Climate Finance (Green Transition)', value: 'climate-finance' },
        { label: 'Technology (The Next Big Things)', value: 'technology' },
        { label: 'Economy (The Next Big Things)', value: 'economy' },
        { label: 'Society (The Next Big Things)', value: 'society' },
        { label: 'Environment (The Next Big Things)', value: 'environment' },
        { label: 'Governance (The Next Big Things)', value: 'governance' },
        { label: 'Sovereign Wealth Funds (Development Finance)', value: 'sovereign-wealth-funds' },
        { label: 'Multilateral Development Banks (Development Finance)', value: 'multilateral-development-banks' },
        { label: 'Blended Finance (Development Finance)', value: 'blended-finance' },
        { label: 'Indonesia Capital Architecture (Development Finance)', value: 'indonesia-capital-architecture' },
        { label: 'Critical Thinking (Learning)', value: 'critical-thinking' },
        { label: 'Books (Learning)', value: 'books' },
        { label: 'IELTS (Learning)', value: 'ielts' },
      ],
    },
    slugField({
      position: undefined,
    }),
  ],
}
