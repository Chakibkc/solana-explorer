import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', limit = '20' } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  
  const currentSlot = 287654321;
  const blocks = [];
  
  for (let i = 0; i < limitNum; i++) {
    const slot = currentSlot - (pageNum - 1) * limitNum - i;
    blocks.push({
      block_number: slot,
      slot: slot,
      timestamp: Date.now() / 1000 - i * 0.4,
      leader: `Validator${Math.floor(Math.random() * 100)}...`,
      transactions_count: Math.floor(Math.random() * 500) + 100,
      blockhash: `${Math.random().toString(36).substring(2, 15)}...`,
      parent_slot: slot - 1,
      previous_blockhash: `${Math.random().toString(36).substring(2, 15)}...`
    });
  }
  
  res.status(200).json({
    blocks,
    total: currentSlot,
    page: pageNum,
    limit: limitNum
  });
}
