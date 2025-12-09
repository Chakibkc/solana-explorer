import type { NextApiRequest, NextApiResponse } from 'next';

const POPULAR_TOKENS = [
  { name: 'Solana', symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112' },
  { name: 'USD Coin', symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
  { name: 'Tether USD', symbol: 'USDT', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
  { name: 'Bonk', symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  { name: 'Jupiter', symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' },
  { name: 'Pyth Network', symbol: 'PYTH', mint: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3' },
  { name: 'Raydium', symbol: 'RAY', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
  { name: 'Orca', symbol: 'ORCA', mint: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokens = POPULAR_TOKENS.map(token => ({
    ...token,
    decimals: 9,
    price: Math.random() * 100,
    volume_24h: Math.floor(Math.random() * 10000000),
    market_cap: Math.floor(Math.random() * 100000000),
    change_24h: (Math.random() - 0.5) * 20,
    holders: Math.floor(Math.random() * 1000000)
  }));
  
  res.status(200).json({
    tokens,
    total: tokens.length
  });
}
