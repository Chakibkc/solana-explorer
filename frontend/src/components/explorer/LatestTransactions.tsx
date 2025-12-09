'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeAgo, shortenAddress } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export function LatestTransactions() {
  const { data, isLoading } = useQuery({
    queryKey: ['latest-transactions'],
    queryFn: () => api.getTransactions(1, 10),
    refetchInterval: 10000,
  })

  return (
    <Card className="bg-card-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Latest Transactions</CardTitle>
          <Link href="/transactions" className="text-sm text-primary hover:underline flex items-center gap-1">
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
            data?.transactions.map((tx) => (
              <Link
                key={tx.signature}
                href={`/tx/${tx.signature}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {tx.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-chart-up flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-chart-down flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="font-mono text-sm truncate">
                      {shortenAddress(tx.signature, 8)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      From {shortenAddress(tx.signer)}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm">{tx.fee / 1e9} SOL</div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimeAgo(tx.timestamp)}
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
