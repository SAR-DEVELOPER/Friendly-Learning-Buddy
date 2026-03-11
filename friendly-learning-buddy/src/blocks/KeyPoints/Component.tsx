import React from 'react'
import { CheckCircle } from 'lucide-react'

type KeyPointsBlockProps = {
  points?: { point: string; id?: string }[]
}

export const KeyPointsBlock: React.FC<KeyPointsBlockProps> = ({ points }) => {
  if (!points || points.length === 0) return null

  return (
    <div className="my-6 rounded-xl border border-blue-100 bg-blue-50/50 px-6 py-5">
      <p className="mb-3 font-bold text-gray-900">Key points</p>
      <ul className="space-y-3">
        {points.map((item, i) => (
          <li key={item.id ?? i} className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <span className="text-sm leading-relaxed text-blue-700">{item.point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
