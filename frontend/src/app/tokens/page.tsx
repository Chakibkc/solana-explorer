import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TokensPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Tokens</h1>
        <p className="text-muted-foreground">Browse Solana tokens and their metrics</p>
      </div>
      
      <Card className="bg-card-gradient">
        <CardHeader>
          <CardTitle>All Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">Token list will be displayed here</div>
        </CardContent>
      </Card>
    </div>
  )
}
