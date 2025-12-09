import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }
  
  const query = q as string;
  
  // Detect what type of search
  if (/^\d+$/.test(query)) {
    // Looks like a block number
    return res.status(200).json({
      type: 'block',
      result: {
        block_number: parseInt(query),
        slot: parseInt(query),
        timestamp: Date.now() / 1000,
        transactions_count: Math.floor(Math.random() * 500)
      }
    });
  }
  
  if (query.length > 32) {
    // Looks like an address or signature
    return res.status(200).json({
      type: 'address',
      result: {
        address: query,
        balance: Math.floor(Math.random() * 1000000000),
        transactions: Math.floor(Math.random() * 10000)
      }
    });
  }
  
  return res.status(404).json({
    error: 'Not found',
    query
  });
}
