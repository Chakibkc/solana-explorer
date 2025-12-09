'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercent } from '@/lib/utils'
import Link from 'next/link'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function TrendingTokens() {
  const { data, isLoading } = useQuery({
    queryKey: ['trending-tokens'],
    queryFn: () => api.getTokens(1, 6, 'volume_24h'),
  })

  return (
    <Card className="bg-card-gradient">
      <CardHeader>
        <CardTitle>Trending Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-24 rounded" />
              ))}
            </>
          ) : (
            data?.tokens.map((token) => (
              <Link
                key={token.mint}
                href={`/token/${token.mint}`}
                className="p-4 rounded-lg border bg-background hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {token.name}
                    </div>
                  </div>
                  {token.price_change_24h >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-chart-up" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-chart-down" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold">
                    {formatCurrency(token.price)}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      token.price_change_24h >= 0 ? 'text-chart-up' : 'text-chart-down'
                    }`}
                  >
                    {formatPercent(token.price_change_24h)}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
