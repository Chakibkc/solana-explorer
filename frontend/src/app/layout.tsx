import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solana Explorer - Blockchain & DEX Analytics',
  description: 'Modern Solana blockchain explorer with integrated DEX analytics, real-time market data, and developer API platform',
  keywords: ['Solana', 'blockchain', 'explorer', 'DEX', 'analytics', 'cryptocurrency'],
  authors: [{ name: 'Solana Explorer Team' }],
  openGraph: {
    title: 'Solana Explorer - Blockchain & DEX Analytics',
    description: 'Modern Solana blockchain explorer with integrated DEX analytics',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solana Explorer',
    description: 'Modern Solana blockchain explorer with integrated DEX analytics',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-auto scrollbar-thin">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
