import type { Block } from 'payload'

export const GoogleSheetsBlock: Block = {
  slug: 'googleSheets',
  interfaceName: 'GoogleSheetsBlock',
  labels: {
    singular: 'Spreadsheet Embed',
    plural: 'Spreadsheet Embeds',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Spreadsheet URL',
      admin: {
        description:
          'SharePoint/OneDrive: buka file di SharePoint → klik (...) → Embed → copy HANYA bagian src="..." dari kode iframe (formatnya harus /_layouts/15/Doc.aspx?sourcedoc=...). ' +
          'JANGAN gunakan share link biasa (:x:/g/...) karena tidak bisa di-embed. ' +
          'Google Sheets: paste URL edit biasa, misal https://docs.google.com/spreadsheets/d/ID/edit',
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Tinggi (px)',
      defaultValue: 500,
      admin: {
        description: 'Tinggi iframe dalam piksel. Default: 500.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (opsional)',
    },
  ],
}
