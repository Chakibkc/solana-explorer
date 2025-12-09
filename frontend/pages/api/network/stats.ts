import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mock Solana network stats
  res.status(200).json({
    slot: 287654321 + Math.floor(Math.random() * 1000),
    block_height: 287654321,
    tps: Math.floor(2000 + Math.random() * 1000),
    epoch: 612,
    total_supply: 580000000,
    circulating_supply: 470000000,
    average_block_time: 0.4
  });
}
