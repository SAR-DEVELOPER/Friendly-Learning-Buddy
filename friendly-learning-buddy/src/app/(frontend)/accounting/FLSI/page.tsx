import type { Metadata } from 'next/types'
import React from 'react'
import { Search } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

type LineItem = {
  labelId: string
  code?: string
  val1: string
  val2: string
  labelEn: string
  slug: string
}

const currentAssets: LineItem[] = [
  { labelId: 'Kas dan setara kas', code: '3i.6', val1: '2,614,318', val2: '5,018,739', labelEn: 'Cash and cash equivalents', slug: 'kas-dan-setara-kas' },
  { labelId: 'Kas yang dibatasi penggunaannya', code: '3i.7', val1: '154,217', val2: '133,537', labelEn: 'Restricted cash', slug: 'kas-yang-dibatasi-penggunaannya' },
  { labelId: 'Piutang usaha, neto', code: '3b,4dc', val1: '2,203,018', val2: '2,063,070', labelEn: 'Trade receivables, net', slug: 'piutang-usaha-neto' },
  { labelId: 'Piutang ketiga', code: '3b.5', val1: '520,885', val2: '715,327', labelEn: 'Third parties', slug: 'piutang-ketiga' },
  { labelId: 'Piutang bermiutah', code: '3g.9', val1: '823,348', val2: '801,429', labelEn: 'Related parties', slug: 'piutang-bermiutah' },
  { labelId: 'Piutang lain-lain, neto', code: '3h,10,14d', val1: '28,830', val2: '28,217', labelEn: 'Other receivables, net', slug: 'piutang-lain-lain-neto' },
  { labelId: 'Piutang dari Pemerintah', code: '3h,10', val1: '85,053', val2: '94,887', labelEn: 'Due from the Government', slug: 'piutang-dari-pemerintah' },
  { labelId: 'Persediaan, neto', code: '3j,11', val1: '809,397', val2: '658,712', labelEn: 'Inventories, net', slug: 'persediaan-neto' },
  { labelId: 'Piutang pajak penghasilan dan dividen taxes', code: '3c,43a', val1: '300,738', val2: '275,812', labelEn: 'Corporate and dividend taxes receivable - current portion', slug: 'piutang-pajak-penghasilan-dan-dividen-taxes' },
  { labelId: 'Uang muka dan biaya dibayar di muka', code: '3c,43a', val1: '20,268', val2: '12,503', labelEn: 'Advances and prepayments - current portion', slug: 'uang-muka-dan-biaya-dibayar-di-muka' },
  { labelId: 'Aset lancar lainnya', code: '3h,15', val1: '179,426', val2: '177,429', labelEn: 'Other current assets', slug: 'aset-lancar-lainnya' },
]

const nonCurrentAssets: LineItem[] = [
  { labelId: 'Aset tidak lancar lainnya', code: '14a', val1: '60,913', val2: '210,253', labelEn: 'Other non-current assets', slug: 'aset-tidak-lancar-lainnya' },
  { labelId: 'Kas yang dibatasi penggunaannya', code: '3i,7', val1: '1,890,493', val2: '1,700,675', labelEn: 'Restricted cash - non-current portion', slug: 'kas-yang-dibatasi-penggunaannya-non-current' },
  { labelId: 'Piutang usaha, neto', code: '3i,12', val1: '544,278', val2: '522,121', labelEn: 'Trade receivables, net - non-current portion', slug: 'piutang-usaha-neto-non-current' },
  { labelId: 'Aset tetap, neto', code: '3d,13', val1: '71,814', val2: '73,800', labelEn: 'Fixed assets, net', slug: 'aset-tetap-neto' },
  { labelId: 'Properti investasi', code: '3c,43a', val1: '5,149', val2: '3,301', labelEn: 'Investment properties', slug: 'properti-investasi' },
  { labelId: 'Aset pajak tangguhan', code: '10', val1: '53,721', val2: '95,263', labelEn: 'Deferred tax assets', slug: 'aset-pajak-tangguhan' },
  { labelId: 'Investasi jangka panjang', val1: '1,109,172', val2: '1,602,821', labelEn: 'Long-term investments', slug: 'investasi-jangka-panjang' },
  { labelId: 'Uang muka dan biaya dibayar di muka', code: '3h,15', val1: '50', val2: '2,242', labelEn: 'Advances and prepayments - non-current portion', slug: 'uang-muka-dan-biaya-dibayar-di-muka-non-current' },
  { labelId: 'Piutang pajak penghasilan dan dividen taxes', code: '3c,43a', val1: '262,713', val2: '213,492', labelEn: 'Corporate and dividend taxes receivable - non-current portion', slug: 'piutang-pajak-penghasilan-dan-dividen-taxes-non-current' },
  { labelId: 'Piutang tidak lancar lainnya', code: '3c,43a', val1: '3,106', val2: '3,460', labelEn: 'Other non-current receivables', slug: 'piutang-tidak-lancar-lainnya' },
  { labelId: 'Aset hak dan gas bumi, neto', code: '3m,17', val1: '17,905,149', val2: '16,130,200', labelEn: 'Oil and gas properties, net', slug: 'aset-hak-dan-gas-bumi-neto' },
  { labelId: 'Aset hak guna, neto', code: '3n,18', val1: '123,977', val2: '203,379', labelEn: 'Right of use assets, net', slug: 'aset-hak-guna-neto' },
  { labelId: 'Aset tidak lancar lainnya', code: '15b', val1: '533,865', val2: '455,380', labelEn: 'Other non-current assets', slug: 'aset-tidak-lancar-lainnya-15b' },
]

function ItemLabel({ item, postSlugs }: { item: LineItem; postSlugs: Set<string> }) {
  return (
    <div className="text-sm text-gray-900">
      {postSlugs.has(item.slug) ? (
        <Link href={`/posts/${item.slug}`} className="hover:text-purple-600 transition-colors">
          {item.labelId}
        </Link>
      ) : (
        <span>{item.labelId}</span>
      )}
      {item.code && <div className="text-xs text-gray-500 mt-1">{item.code}</div>}
    </div>
  )
}

export default async function FLSIPage() {
  // Fetch all posts under the FLSI chapter to build the slug lookup set
  const payload = await getPayload({ config: configPromise })

  const chaptersResult = await payload.find({
    collection: 'chapters',
    where: { subcategory: { equals: 'flsi' } },
    limit: 10,
    overrideAccess: false,
  })

  const chapterIds = chaptersResult.docs.map((ch) => ch.id)
  let postSlugs = new Set<string>()

  if (chapterIds.length > 0) {
    const postsResult = await payload.find({
      collection: 'posts',
      where: { chapter: { in: chapterIds } },
      overrideAccess: true,
      limit: 200,
    })
    postSlugs = new Set(postsResult.docs.map((p) => p.slug))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-4 pb-4">
        <Breadcrumb
          items={[
            { label: 'Accounting', href: '/accounting' },
            { label: 'FLSI Detail', href: '/accounting/FLSI' },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              CONSOLIDATED STATEMENT OF FINANCIAL POSITION
            </h1>
            <p className="text-green-600 font-medium">Tanggal 31 Desember 2024</p>
            <p className="text-gray-400 font-sm mb-2">As of December 31st, 2024</p>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              (Disajikan dalam Ribuan Dolar Amerika Serikat, Kecuali Dinyatakan Lain)
            </p>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              (Expressed in Thousands of United States Dollars, Unless Otherwise Stated)
            </p>
          </div>

          {/* Search + Download row */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                type="search"
                placeholder="Search line items..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-400 text-sm"
                aria-label="Search line items"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download as PDF
            </button>
          </div>

          {/* Financial Statement Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">

            {/* ASSETS / ASET Section */}
            <div className="border-b border-gray-200">
              <div className="bg-gray-900 text-white px-6 py-3">
                <h2 className="font-bold text-lg">ASSET / ASET</h2>
              </div>

              {/* Column Headers */}
              <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div>Nama akun (ID) + Kode</div>
                <div className="text-right">31 December 2023</div>
                <div className="text-right">31 December 2022</div>
                <div className="text-right">Chart of account (EN)</div>
              </div>

              {/* ASET LANCAR / CURRENT ASSETS */}
              <div className="px-6 py-3 bg-gray-800 text-white">
                <h3 className="font-bold">ASET LANCAR / CURRENT ASSETS</h3>
              </div>

              <div className="divide-y divide-gray-100">
                {currentAssets.map((item) => (
                  <div
                    key={item.slug}
                    className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center"
                  >
                    <ItemLabel item={item} postSlugs={postSlugs} />
                    <div className="text-right text-sm text-gray-900">{item.val1}</div>
                    <div className="text-right text-sm text-gray-900">{item.val2}</div>
                    <div className="text-sm text-gray-600 text-right">{item.labelEn}</div>
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-100 font-semibold items-center">
                  <div className="text-sm text-gray-900">Jumlah Aset Lancar</div>
                  <div className="text-right text-sm text-gray-900">7,739,498</div>
                  <div className="text-right text-sm text-gray-900">9,979,662</div>
                  <div className="text-sm text-gray-600 text-right">Total Current Assets</div>
                </div>
              </div>

              {/* ASET TIDAK LANCAR / NON-CURRENT ASSETS */}
              <div className="px-6 py-3 bg-gray-800 text-white">
                <h3 className="font-bold">ASET TIDAK LANCAR / NON-CURRENT ASSETS</h3>
              </div>

              <div className="divide-y divide-gray-100">
                {nonCurrentAssets.map((item) => (
                  <div
                    key={item.slug}
                    className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center"
                  >
                    <ItemLabel item={item} postSlugs={postSlugs} />
                    <div className="text-right text-sm text-gray-900">{item.val1}</div>
                    <div className="text-right text-sm text-gray-900">{item.val2}</div>
                    <div className="text-sm text-gray-600 text-right">{item.labelEn}</div>
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-100 font-semibold items-center">
                  <div className="text-sm text-gray-900">Jumlah Aset Tidak Lancar</div>
                  <div className="text-right text-sm text-gray-900">22,564,400</div>
                  <div className="text-right text-sm text-gray-900">21,216,387</div>
                  <div className="text-sm text-gray-600 text-right">Total Non-current Assets</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-900 text-white font-bold text-base items-center">
                  <div>JUMLAH ASET</div>
                  <div className="text-right">30,303,898</div>
                  <div className="text-right">31,196,049</div>
                  <div className="text-gray-300 font-normal text-sm text-right">TOTAL ASSETS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Columns at Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="font-bold text-gray-900 mb-2">ASET / LIABILITAS</h3>
              <p className="text-xs text-gray-500 mb-4">Assets / Liabilities</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Consult Now
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="font-bold text-gray-900 mb-2">LIABILITIES</h3>
              <p className="text-xs text-gray-500 mb-4">Liabilities</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Consult Now
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="font-bold text-gray-900 mb-2">EKUITAS</h3>
              <p className="text-xs text-gray-500 mb-4">Equity</p>
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Consult Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'FLSI Detail - Consolidated Statement of Financial Position',
    description: 'Detailed consolidated statement of financial position with line-by-line explanations and accounting treatment.',
  }
}
