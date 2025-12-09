'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeAgo, shortenAddress } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LatestBlocks() {
  const { data, isLoading } = useQuery({
    queryKey: ['latest-blocks'],
    queryFn: () => api.getBlocks(1, 10),
    refetchInterval: 10000,
  })

  return (
    <Card className="bg-card-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Latest Blocks</CardTitle>
          <Link href="/blocks" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-16 rounded" />
              ))}
            </>
          ) : (
            data?.blocks.map((block) => (
              <Link
                key={block.block_number}
                href={`/block/${block.block_number}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div>
                  <div className="font-medium">#{block.block_number}</div>
                  <div className="text-sm text-muted-foreground">
                    {block.transactions_count} txns
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{shortenAddress(block.leader)}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimeAgo(block.timestamp)}
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
