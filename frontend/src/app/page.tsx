import { NetworkStats } from '@/components/explorer/NetworkStats'
import { LatestBlocks } from '@/components/explorer/LatestBlocks'
import { LatestTransactions } from '@/components/explorer/LatestTransactions'
import { TrendingTokens } from '@/components/markets/TrendingTokens'
import { SearchBar } from '@/components/explorer/SearchBar'
import { AdBanner } from '@/components/layout/AdBanner'

export default function HomePage() {
  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg bg-card-gradient p-8 chart-pattern">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            Solana Blockchain Explorer
          </h1>
          <p className="text-muted-foreground mb-6">
            Real-time blockchain data, DEX analytics, and market insights
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Ad Banner - Top */}
      <AdBanner slot="home-top" />

      {/* Network Overview */}
      <NetworkStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Blocks */}
        <LatestBlocks />

        {/* Latest Transactions */}
        <LatestTransactions />
      </div>

      {/* Trending Tokens */}
      <TrendingTokens />

      {/* Ad Banner - Bottom */}
      <AdBanner slot="home-bottom" />
    </div>
  )
}
