import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BlocksPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Blocks</h1>
        <p className="text-muted-foreground">Latest blocks on the Solana blockchain</p>
      </div>
      
      <Card className="bg-card-gradient">
        <CardHeader>
          <CardTitle>Recent Blocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">Block list will be displayed here</div>
        </CardContent>
      </Card>
    </div>
  )
}
