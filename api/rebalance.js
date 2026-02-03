// Vercel API route for rebalancing recommendations
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
    const { address, strategy = 'moderate' } = req.query;
    
    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }

    const analyzer = new OptimusAnalyzer();
    const result = await analyzer.getPortfolioRebalancingRecommendations(address, strategy);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in rebalancing recommendations:', error);
    res.status(500).json({ error: error.message });
  }
}