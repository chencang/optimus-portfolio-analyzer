// Vercel API route for homepage
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: "Welcome to Optimus Portfolio Analyzer API",
    endpoints: {
      "portfolio": "/api/portfolio?address=<wallet_address>",
      "risk": "/api/risk?address=<wallet_address>",
      "rebalance": "/api/rebalance?address=<wallet_address>&strategy=<conservative|moderate|aggressive>",
      "insights": "/api/insights?protocol=<protocol_name>"
    },
    description: "Advanced financial analysis and portfolio optimization tool for AI agents on Solana"
  });
}