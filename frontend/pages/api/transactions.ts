import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const transactions = [];
  
  for (let i = 0; i < 20; i++) {
    transactions.push({
      signature: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      slot: 287654321 - i,
      timestamp: Date.now() / 1000 - i * 0.8,
      fee: Math.floor(Math.random() * 10000),
      status: Math.random() > 0.1 ? 'success' : 'failed',
      signer: `Wallet${Math.random().toString(36).substring(2, 10)}...`
    });
  }
  
  res.status(200).json({
    transactions,
    total: 1000000,
    page: 1,
    limit: 20
  });
}
