import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DeveloperPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Developer API</h1>
        <p className="text-muted-foreground">Manage your API keys and view documentation</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-gradient">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your API keys will appear here</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient">
          <CardHeader>
            <CardTitle>API Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Free</h3>
                <p className="text-sm text-muted-foreground">10 requests/minute</p>
              </div>
              <div className="p-4 border rounded-lg border-primary">
                <h3 className="font-semibold">Pro</h3>
                <p className="text-sm text-muted-foreground">1000 requests/minute</p>
                <p className="text-lg font-bold mt-2">$49/month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
