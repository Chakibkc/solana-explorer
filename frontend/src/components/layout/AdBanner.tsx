'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { ExternalLink } from 'lucide-react'

interface AdBannerProps {
  slot: string
}

export function AdBanner({ slot }: AdBannerProps) {
  const { data: ads } = useQuery({
    queryKey: ['ads', slot],
    queryFn: () => api.admin.getAds(),
    select: (ads) => ads.filter((ad) => ad.active && ad.slot === slot),
  })

  const ad = ads?.[0]

  if (!ad) return null

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {ad.image_url && (
            <img
              src={ad.image_url}
              alt="Advertisement"
              className="w-20 h-20 rounded object-cover"
            />
          )}
          <div>
            <span className="text-xs text-muted-foreground">Sponsored</span>
            {ad.label && <p className="font-medium">{ad.label}</p>}
          </div>
        </div>
        <a
          href={ad.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          Learn More <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
