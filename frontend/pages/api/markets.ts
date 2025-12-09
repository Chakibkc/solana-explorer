import type { NextApiRequest, NextApiResponse } from 'next';

const MARKETS = [
  'SOL/USDC', 'SOL/USDT', 'BONK/USDC', 'JUP/USDC', 
  'RAY/USDC', 'ORCA/USDC', 'PYTH/USDC', 'mSOL/SOL'
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const markets = MARKETS.map(pair => ({
    pair,
    price: Math.random() * 100,
    volume_24h: Math.floor(Math.random() * 5000000),
    change_24h: (Math.random() - 0.5) * 15,
    liquidity: Math.floor(Math.random() * 10000000),
    high_24h: Math.random() * 110,
    low_24h: Math.random() * 90
  }));
  
  res.status(200).json({
    markets,
    total: markets.length
  });
}
