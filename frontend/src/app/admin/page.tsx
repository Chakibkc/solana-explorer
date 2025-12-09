import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Key, Image, DollarSign } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, ads, and platform settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', value: '1,234', icon: Users, color: 'text-solana-purple' },
          { title: 'API Keys', value: '456', icon: Key, color: 'text-solana-green' },
          { title: 'Active Ads', value: '12', icon: Image, color: 'text-solana-blue' },
          { title: 'Revenue', value: '$5,678', icon: DollarSign, color: 'text-primary' },
        ].map((stat) => (
          <Card key={stat.title} className="bg-card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-gradient">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">User list will appear here</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient">
          <CardHeader>
            <CardTitle>Advertisement Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Ad management tools will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
