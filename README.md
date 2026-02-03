# Optimus Portfolio Analyzer

Advanced financial analysis and portfolio optimization tool for AI agents on Solana. Provides risk-adjusted returns analysis, portfolio rebalancing recommendations, and predictive market insights for Solana DeFi protocols.

## Features

- Real-time portfolio tracking across Solana DeFi protocols
- Advanced risk metrics calculation (concentration risk, volatility, diversification)
- Automated rebalancing recommendations with cost estimation
- Market intelligence from Jupiter and Pyth
- Integration with major Solana protocols (Jupiter, Kamino, Drift, Pyth)

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Optimus AI    │───▶│  Portfolio       │───▶│  Solana         │
│   Engine        │    │  Tracker         │    │  Integrations   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
       │                       │                        │
       ▼                       ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Analysis &     │    │  Risk Metrics    │    │  Jupiter        │
│  Predictions    │    │  Calculations    │    │  Pyth           │
└─────────────────┘    └──────────────────┘    │  Kamino         │
                                                │  Drift          │
                                                └─────────────────┘
```

## API Endpoints

- `GET /api/portfolio/:address` - Get comprehensive portfolio analysis
- `GET /api/risk/:address` - Get detailed risk metrics
- `GET /api/rebalance/:address/:strategy` - Get rebalancing recommendations (strategy: conservative/moderate/aggressive)
- `GET /api/insights/:protocol` - Get predictive market insights
- `GET /api/recommendations/:strategy` - Get general allocation recommendations

## Installation

```bash
npm install @optimus/portfolio-analyzer
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/chencang/optimus-portfolio-analyzer.git
cd optimus-portfolio-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run the server:
```bash
npm start
```

The server will start on port 3000 by default.

## Usage

```javascript
import { OptimusAnalyzer } from '@optimus/portfolio-analyzer';

const analyzer = new OptimusAnalyzer({
  rpcEndpoint: 'https://api.mainnet-beta.solana.com'  // Optional, defaults to mainnet
});

// Get portfolio analysis
const analysis = await analyzer.analyzePortfolio('So11111111111111111111111111111111111111112');

// Get risk analysis
const riskMetrics = await analyzer.getRiskAnalysis('So11111111111111111111111111111111111111112');

// Get rebalancing recommendations
const rebalanceRecs = await analyzer.getPortfolioRebalancingRecommendations(
  'So11111111111111111111111111111111111111112', 
  'moderate'  // strategy: conservative/moderate/aggressive
);
```

## Integration with Other Projects

The Optimus Portfolio Analyzer is designed to complement other projects in the Solana ecosystem:

- **AgentDEX**: Use our analysis to inform trading decisions
- **SolanaYield**: Enhance yield strategy selection with risk metrics
- **AutoVault**: Improve rebalancing decisions with risk analysis

## Deployment

To deploy to Vercel or similar platform, ensure you have:

- Node.js runtime
- Dependencies from package.json
- Proper build configuration

## License

MIT