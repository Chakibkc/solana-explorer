'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Box, Zap, Clock } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

export function NetworkStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['network-stats'],
    queryFn: api.getNetworkStats,
    refetchInterval: 5000,
  })

  const statItems = [
    {
      title: 'Current Slot',
      value: stats?.slot || 0,
      icon: Box,
      color: 'text-solana-purple',
    },
    {
      title: 'Block Height',
      value: stats?.block_height || 0,
      icon: Activity,
      color: 'text-solana-green',
    },
    {
      title: 'TPS',
      value: stats?.tps || 0,
      icon: Zap,
      color: 'text-solana-blue',
    },
    {
      title: 'Epoch Progress',
      value: `${stats?.epoch_progress || 0}%`,
      icon: Clock,
      color: 'text-primary',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.title} className="bg-card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-24 skeleton rounded" />
            ) : (
              <div className="text-2xl font-bold">
                {typeof item.value === 'number' ? formatNumber(item.value) : item.value}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
