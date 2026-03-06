import type { Metadata } from 'next/types'
import React from 'react'
import { Search } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function FLSIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-4 pb-4">
        <Breadcrumb
          items={[
            { label: 'Accounting', href: '/accounting' },
            { label: 'FLSI Detail', href: '/accounting/FLSI' }
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
            <p className="text-green-600 font-medium">
              Tanggal 31 Desember 2024
            </p>
            <p className="text-gray-400 font-sm mb-2">
              As of December 31st, 2024
            </p>
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
              
              {/* Column Headers - 4 columns: Indonesian+code | Value 1 | Value 2 | English */}
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

              {/* Line Items - 4 columns */}
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Kas dan setara kas</Link>
                    <div className="text-xs text-gray-500 mt-1">3i.6</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">2,614,318</div>
                  <div className="text-right text-sm text-gray-900">5,018,739</div>
                  <div className="text-sm text-gray-600 text-right">Cash and cash equivalents</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Kas yang dibatasi penggunaannya</Link>
                    <div className="text-xs text-gray-500 mt-1">3i.7</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">154,217</div>
                  <div className="text-right text-sm text-gray-900">133,537</div>
                  <div className="text-sm text-gray-600 text-right">Restricted cash</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang usaha, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3b,4dc</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">2,203,018</div>
                  <div className="text-right text-sm text-gray-900">2,063,070</div>
                  <div className="text-sm text-gray-600 text-right">Trade receivables, net</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang ketiga</Link>
                    <div className="text-xs text-gray-500 mt-1">3b.5</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">520,885</div>
                  <div className="text-right text-sm text-gray-900">715,327</div>
                  <div className="text-sm text-gray-600 text-right">Third parties</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang bermiutah</Link>
                    <div className="text-xs text-gray-500 mt-1">3g.9</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">823,348</div>
                  <div className="text-right text-sm text-gray-900">801,429</div>
                  <div className="text-sm text-gray-600 text-right">Related parties</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang lain-lain, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3h,10,14d</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">28,830</div>
                  <div className="text-right text-sm text-gray-900">28,217</div>
                  <div className="text-sm text-gray-600 text-right">Other receivables, net</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang dari Pemerintah</Link>
                    <div className="text-xs text-gray-500 mt-1">3h,10</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">85,053</div>
                  <div className="text-right text-sm text-gray-900">94,887</div>
                  <div className="text-sm text-gray-600 text-right">Due from the Government</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Persediaan, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3j,11</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">809,397</div>
                  <div className="text-right text-sm text-gray-900">658,712</div>
                  <div className="text-sm text-gray-600 text-right">Inventories, net</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang pajak penghasilan dan dividen taxes</Link>
                    <div className="text-xs text-gray-500 mt-1">3c,43a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">300,738</div>
                  <div className="text-right text-sm text-gray-900">275,812</div>
                  <div className="text-sm text-gray-600 text-right">Corporate and dividend taxes receivable - current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Uang muka dan biaya dibayar di muka</Link>
                    <div className="text-xs text-gray-500 mt-1">3c,43a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">20,268</div>
                  <div className="text-right text-sm text-gray-900">12,503</div>
                  <div className="text-sm text-gray-600 text-right">Advances and prepayments - current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset lancar lainnya</Link>
                    <div className="text-xs text-gray-500 mt-1">3h,15</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">179,426</div>
                  <div className="text-right text-sm text-gray-900">177,429</div>
                  <div className="text-sm text-gray-600 text-right">Other current assets</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-100 font-semibold items-center">
                  <div className="text-sm text-gray-900">
                    Jumlah Aset Lancar
                  </div>
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
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset tidak lancar lainnya</Link>
                    <div className="text-xs text-gray-500 mt-1">14a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">60,913</div>
                  <div className="text-right text-sm text-gray-900">210,253</div>
                  <div className="text-sm text-gray-600 text-right">Other non-current assets</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Kas yang dibatasi penggunaannya</Link>
                    <div className="text-xs text-gray-500 mt-1">3i,7</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">1,890,493</div>
                  <div className="text-right text-sm text-gray-900">1,700,675</div>
                  <div className="text-sm text-gray-600 text-right">Restricted cash - non-current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang usaha, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3i,12</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">544,278</div>
                  <div className="text-right text-sm text-gray-900">522,121</div>
                  <div className="text-sm text-gray-600 text-right">Trade receivables, net - non-current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset tetap, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3d,13</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">71,814</div>
                  <div className="text-right text-sm text-gray-900">73,800</div>
                  <div className="text-sm text-gray-600 text-right">Fixed assets, net</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Properti investasi</Link>
                    <div className="text-xs text-gray-500 mt-1">3c,43a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">5,149</div>
                  <div className="text-right text-sm text-gray-900">3,301</div>
                  <div className="text-sm text-gray-600 text-right">Investment properties</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset pajak tangguhan</Link>
                    <div className="text-xs text-gray-500 mt-1">10</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">53,721</div>
                  <div className="text-right text-sm text-gray-900">95,263</div>
                  <div className="text-sm text-gray-600 text-right">Deferred tax assets</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Investasi jangka panjang</Link>
                  </div>
                  <div className="text-right text-sm text-gray-900">1,109,172</div>
                  <div className="text-right text-sm text-gray-900">1,602,821</div>
                  <div className="text-sm text-gray-600 text-right">Long-term investments</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Uang muka dan biaya dibayar di muka</Link>
                    <div className="text-xs text-gray-500 mt-1">3h,15</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">50</div>
                  <div className="text-right text-sm text-gray-900">2,242</div>
                  <div className="text-sm text-gray-600 text-right">Advances and prepayments - non-current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang pajak penghasilan dan dividen taxes</Link>
                    <div className="text-xs text-gray-500 mt-1">3c,43a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">262,713</div>
                  <div className="text-right text-sm text-gray-900">213,492</div>
                  <div className="text-sm text-gray-600 text-right">Corporate and dividend taxes receivable - non-current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Piutang tidak lancar lainnya</Link>
                    <div className="text-xs text-gray-500 mt-1">3c,43a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">3,106</div>
                  <div className="text-right text-sm text-gray-900">3,460</div>
                  <div className="text-sm text-gray-600 text-right">Other non-current receivables</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset hak dan gas bumi, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3m,17</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">17,905,149</div>
                  <div className="text-right text-sm text-gray-900">16,130,200</div>
                  <div className="text-sm text-gray-600 text-right">Oil and gas properties, net</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset hak guna, neto</Link>
                    <div className="text-xs text-gray-500 mt-1">3n,18</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">123,977</div>
                  <div className="text-right text-sm text-gray-900">203,379</div>
                  <div className="text-sm text-gray-600 text-right">Right of use assets, net</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Aset tidak lancar lainnya</Link>
                    <div className="text-xs text-gray-500 mt-1">15b</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">533,865</div>
                  <div className="text-right text-sm text-gray-900">455,380</div>
                  <div className="text-sm text-gray-600 text-right">Other non-current assets</div>
                </div>
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

            {/* LIABILITIES AND EQUITY Section - commented out for now */}
            {/* <div className="mt-8">
              <div className="px-6 py-3 bg-gray-900 text-white">
                <h3 className="font-bold text-lg">ASET / LIABILITAS</h3>
              </div>
              <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div>Nama akun (ID) + Kode</div>
                <div className="text-right">31 December 2023</div>
                <div className="text-right">31 December 2022</div>
                <div className="text-right">Chart of account (EN)</div>
              </div>
              <div className="px-6 py-3 bg-gray-800 text-white">
                <h3 className="font-bold">LIABILITAS JANGKA PENDEK / CURRENT LIABILITIES</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Utang usaha</Link>
                    <div className="text-xs text-gray-500 mt-1">3a</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">86,745</div>
                  <div className="text-right text-sm text-gray-900">78,216</div>
                  <div className="text-sm text-gray-600 text-right">Trade payables</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Deposito - Pihak ketiga (jangka pendek)</Link>
                    <div className="text-xs text-gray-500 mt-1">3b</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">1,890,473</div>
                  <div className="text-right text-sm text-gray-900">1,701,276</div>
                  <div className="text-sm text-gray-600 text-right">Short-term deposits - third parties</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Utang jangka panjang</Link>
                    <div className="text-xs text-gray-500 mt-1">3c</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">858,276</div>
                  <div className="text-right text-sm text-gray-900">801,148</div>
                  <div className="text-sm text-gray-600 text-right">Long-term debt - current portion</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Utang pajak</Link>
                    <div className="text-xs text-gray-500 mt-1">3d</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">27,437</div>
                  <div className="text-right text-sm text-gray-900">24,108</div>
                  <div className="text-sm text-gray-600 text-right">Tax payables</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Utang lain-lain</Link>
                    <div className="text-xs text-gray-500 mt-1">3e</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">5,180</div>
                  <div className="text-right text-sm text-gray-900">5,193</div>
                  <div className="text-sm text-gray-600 text-right">Other payables</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center">
                  <div className="text-sm text-gray-900">
                    <Link href="#" className="hover:text-purple-600 transition-colors">Beban yang masih harus dibayar</Link>
                    <div className="text-xs text-gray-500 mt-1">3f</div>
                  </div>
                  <div className="text-right text-sm text-gray-900">89,713</div>
                  <div className="text-right text-sm text-gray-900">88,193</div>
                  <div className="text-sm text-gray-600 text-right">Accrued expenses</div>
                </div>
                <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-100 font-semibold items-center">
                  <div className="text-sm text-gray-900">Jumlah Liabilitas Jangka Pendek</div>
                  <div className="text-right text-sm text-gray-900">2,957,923</div>
                  <div className="text-right text-sm text-gray-900">2,769,126</div>
                  <div className="text-sm text-gray-600 text-right">Total current liabilities</div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-800 text-white">
                <h3 className="font-bold">LIABILITAS JANGKA PANJANG / NON-CURRENT LIABILITIES</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-100 font-semibold items-center">
                  <div className="text-sm text-gray-900">Jumlah Liabilitas</div>
                  <div className="text-right text-sm text-gray-900">—</div>
                  <div className="text-right text-sm text-gray-900">—</div>
                  <div className="text-sm text-gray-600 text-right">Total liabilities</div>
                </div>
              </div>
            </div> */}
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
