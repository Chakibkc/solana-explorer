import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function DonatePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-solana-purple" />
        <h1 className="text-3xl font-bold">Support Our Project</h1>
        <p className="text-muted-foreground mt-2">
          Help us maintain and improve this blockchain explorer
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card-gradient">
          <CardHeader>
            <CardTitle>Donate SOL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Donation Address:</p>
              <p className="font-mono text-sm break-all">
                SoLExPLorEr1111111111111111111111111111111
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                All donations help us cover infrastructure costs and continue development
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
