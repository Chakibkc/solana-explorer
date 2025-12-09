'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api-client'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const result = await api.search(query)
      
      switch (result.type) {
        case 'block':
          router.push(`/block/${query}`)
          break
        case 'transaction':
          router.push(`/tx/${query}`)
          break
        case 'address':
          router.push(`/address/${query}`)
          break
        case 'token':
          router.push(`/token/${query}`)
          break
        default:
          alert('No results found')
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by Address / Txn Hash / Block / Token..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" variant="gradient" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  )
}
