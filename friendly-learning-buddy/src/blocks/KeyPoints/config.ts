import type { Block } from 'payload'

export const KeyPoints: Block = {
  slug: 'keyPoints',
  labels: {
    singular: 'Key Points',
    plural: 'Key Points',
  },
  fields: [
    {
      name: 'points',
      type: 'array',
      label: 'Points',
      minRows: 1,
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          label: 'Point',
        },
      ],
    },
  ],
  interfaceName: 'KeyPointsBlock',
}
