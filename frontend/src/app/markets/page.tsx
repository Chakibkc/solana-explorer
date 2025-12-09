import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MarketsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">DEX Markets</h1>
        <p className="text-muted-foreground">Real-time DEX market data and analytics</p>
      </div>
      
      <Card className="bg-card-gradient">
        <CardHeader>
          <CardTitle>Trending Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">Market data will be displayed here</div>
        </CardContent>
      </Card>
    </div>
  )
}
