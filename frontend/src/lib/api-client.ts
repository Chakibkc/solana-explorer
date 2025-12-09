import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor for auth
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            window.location.href = '/auth/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()

// API Methods
export const api = {
  // Blocks
  getBlocks: (page = 1, limit = 20) =>
    apiClient.get<BlocksResponse>(`/api/blocks?page=${page}&limit=${limit}`),
  
  getBlock: (blockNumber: number | string) =>
    apiClient.get<BlockDetails>(`/api/blocks/${blockNumber}`),

  // Transactions
  getTransactions: (page = 1, limit = 20) =>
    apiClient.get<TransactionsResponse>(`/api/transactions?page=${page}&limit=${limit}`),
  
  getTransaction: (signature: string) =>
    apiClient.get<TransactionDetails>(`/api/transactions/${signature}`),

  // Addresses
  getAddress: (address: string) =>
    apiClient.get<AddressDetails>(`/api/addresses/${address}`),
  
  getAddressTransactions: (address: string, page = 1, limit = 20) =>
    apiClient.get<TransactionsResponse>(`/api/addresses/${address}/transactions?page=${page}&limit=${limit}`),

  // Tokens
  getTokens: (page = 1, limit = 20, sort = 'volume_24h') =>
    apiClient.get<TokensResponse>(`/api/tokens?page=${page}&limit=${limit}&sort=${sort}`),
  
  getToken: (mint: string) =>
    apiClient.get<TokenDetails>(`/api/tokens/${mint}`),

  // Markets
  getMarkets: (page = 1, limit = 20, sort = 'volume_24h') =>
    apiClient.get<MarketsResponse>(`/api/markets?page=${page}&limit=${limit}&sort=${sort}`),
  
  getMarket: (pair: string) =>
    apiClient.get<MarketDetails>(`/api/markets/${pair}`),

  // Network Stats
  getNetworkStats: () =>
    apiClient.get<NetworkStats>('/api/network/stats'),

  // Search
  search: (query: string) =>
    apiClient.get<SearchResults>(`/api/search?q=${encodeURIComponent(query)}`),

  // Auth
  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/api/auth/register', data),
  
  login: (data: LoginData) =>
    apiClient.post<AuthResponse>('/api/auth/login', data),
  
  logout: () =>
    apiClient.post('/api/auth/logout'),

  // User
  getProfile: () =>
    apiClient.get<UserProfile>('/api/user/profile'),
  
  updateProfile: (data: Partial<UserProfile>) =>
    apiClient.put<UserProfile>('/api/user/profile', data),

  // API Keys (Developer Portal)
  getApiKeys: () =>
    apiClient.get<ApiKey[]>('/api/user/api-keys'),
  
  createApiKey: (name: string, plan: string) =>
    apiClient.post<ApiKey>('/api/user/api-keys', { name, plan }),
  
  deleteApiKey: (id: string) =>
    apiClient.delete(`/api/user/api-keys/${id}`),

  // Watchlist
  getWatchlist: () =>
    apiClient.get<WatchlistItem[]>('/api/user/watchlist'),
  
  addToWatchlist: (data: { type: string; address: string }) =>
    apiClient.post('/api/user/watchlist', data),
  
  removeFromWatchlist: (id: string) =>
    apiClient.delete(`/api/user/watchlist/${id}`),

  // Admin
  admin: {
    getUsers: (page = 1, limit = 20) =>
      apiClient.get<UsersResponse>(`/api/admin/users?page=${page}&limit=${limit}`),
    
    updateUser: (id: string, data: Partial<User>) =>
      apiClient.put<User>(`/api/admin/users/${id}`, data),
    
    getAds: () =>
      apiClient.get<Ad[]>('/api/admin/ads'),
    
    createAd: (data: CreateAdData) =>
      apiClient.post<Ad>('/api/admin/ads', data),
    
    updateAd: (id: string, data: Partial<Ad>) =>
      apiClient.put<Ad>(`/api/admin/ads/${id}`, data),
    
    deleteAd: (id: string) =>
      apiClient.delete(`/api/admin/ads/${id}`),
  },
}

// Types
export interface BlocksResponse {
  blocks: Block[]
  total: number
  page: number
  limit: number
}

export interface Block {
  block_number: number
  timestamp: number
  leader: string
  transactions_count: number
  slot: number
}

export interface BlockDetails extends Block {
  parent_slot: number
  blockhash: string
  previous_blockhash: string
}

export interface TransactionsResponse {
  transactions: Transaction[]
  total: number
  page: number
  limit: number
}

export interface Transaction {
  signature: string
  block_number: number
  timestamp: number
  fee: number
  status: 'success' | 'failed'
  signer: string
}

export interface TransactionDetails extends Transaction {
  slot: number
  instructions: Instruction[]
  token_transfers: TokenTransfer[]
}

export interface Instruction {
  program: string
  data: string
  accounts: string[]
}

export interface TokenTransfer {
  from: string
  to: string
  amount: string
  token: string
  decimals: number
}

export interface AddressDetails {
  address: string
  balance: number
  type: string
  tokens: TokenBalance[]
  transaction_count: number
}

export interface TokenBalance {
  mint: string
  symbol: string
  name: string
  balance: string
  decimals: number
  usd_value?: number
}

export interface TokensResponse {
  tokens: Token[]
  total: number
  page: number
  limit: number
}

export interface Token {
  mint: string
  symbol: string
  name: string
  price: number
  price_change_24h: number
  volume_24h: number
  market_cap: number
  holders: number
}

export interface TokenDetails extends Token {
  decimals: number
  total_supply: string
  logo_uri?: string
  description?: string
}

export interface MarketsResponse {
  markets: Market[]
  total: number
  page: number
  limit: number
}

export interface Market {
  pair: string
  base_token: string
  quote_token: string
  price: number
  price_change_24h: number
  volume_24h: number
  liquidity: number
  dex: string
}

export interface MarketDetails extends Market {
  chart_data: ChartData[]
  recent_trades: Trade[]
}

export interface ChartData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface Trade {
  timestamp: number
  price: number
  amount: number
  side: 'buy' | 'sell'
  signature: string
}

export interface NetworkStats {
  slot: number
  block_height: number
  tps: number
  total_transactions: number
  epoch: number
  epoch_progress: number
}

export interface SearchResults {
  type: 'block' | 'transaction' | 'address' | 'token' | 'unknown'
  result?: unknown
}

export interface AuthResponse {
  token: string
  user: UserProfile
}

export interface RegisterData {
  email: string
  password: string
  username?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UserProfile {
  id: string
  email: string
  username?: string
  role: 'user' | 'admin'
  created_at: number
}

export interface ApiKey {
  id: string
  name: string
  key: string
  plan: string
  rate_limit: number
  requests_used: number
  created_at: number
}

export interface WatchlistItem {
  id: string
  type: 'token' | 'address' | 'market'
  address: string
  name?: string
  added_at: number
}

export interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export interface User {
  id: string
  email: string
  username?: string
  role: string
  status: string
  created_at: number
}

export interface Ad {
  id: string
  slot: string
  image_url: string
  link_url: string
  label?: string
  active: boolean
  impressions: number
  clicks: number
}

export interface CreateAdData {
  slot: string
  image_url: string
  link_url: string
  label?: string
  active?: boolean
}
