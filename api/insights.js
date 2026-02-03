// Vercel API route for market insights
import { OptimusAnalyzer } from '../src/index';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { protocol = 'all' } = req.query;

    const analyzer = new OptimusAnalyzer();
    const result = await analyzer.getMarketInsights(protocol);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in market insights:', error);
    res.status(500).json({ error: error.message });
  }
}