'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Box, 
  FileText, 
  Wallet, 
  Coins, 
  TrendingUp, 
  Key, 
  Settings,
  Heart,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Blocks', href: '/blocks', icon: Box },
  { name: 'Transactions', href: '/transactions', icon: FileText },
  { name: 'Addresses', href: '/addresses', icon: Wallet },
  { name: 'Tokens', href: '/tokens', icon: Coins },
  { name: 'Markets', href: '/markets', icon: TrendingUp },
  { name: 'API', href: '/developer', icon: Key },
  { name: 'Donate', href: '/donate', icon: Heart },
  { name: 'Admin', href: '/admin', icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-solana-gradient" />
          <span className="font-bold text-xl text-gradient">SolExplorer</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          Network: <span className="text-solana-green">Mainnet</span>
        </div>
      </div>
    </aside>
  )
}
