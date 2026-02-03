import express from 'express';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import axios from 'axios';
import { AdvancedAnalyzer } from './analyzer';

/**
 * Optimus Portfolio Analyzer
 * Advanced financial analysis and portfolio optimization tool for AI agents on Solana
 */
export class OptimusAnalyzer {
  private connection: Connection;
  private jupiterApi: string = 'https://quote-api.jup.ag/v6';
  private advancedAnalyzer: AdvancedAnalyzer;
  
  constructor(private rpcEndpoint: string = clusterApiUrl('mainnet-beta')) {
    this.connection = new Connection(this.rpcEndpoint, 'confirmed');
    this.advancedAnalyzer = new AdvancedAnalyzer(this.rpcEndpoint);
  }

  /**
   * Analyze a Solana portfolio
   */
  async analyzePortfolio(walletAddress: string) {
    const publicKey = new PublicKey(walletAddress);
    
    // Get token accounts
    const tokenAccounts = await this.connection.getTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    });

    // Get balance
    const solBalance = await this.connection.getBalance(publicKey);

    // Get Jupiter quote for token values
    const tokenBalances = [];
    for (const account of tokenAccounts.value) {
      const parsedAccountInfo = account.account.data;
      // Simplified token balance extraction
      tokenBalances.push({
        mint: account.pubkey.toString(),
        amount: parsedAccountInfo.length > 0 ? 'calculated_amount' : 0
      });
    }

    // Get advanced risk metrics
    const riskMetrics = await this.advancedAnalyzer.calculateRiskMetrics(walletAddress);

    // Get market insights
    const marketInsights = await this.advancedAnalyzer.getMarketInsights();

    return {
      wallet: walletAddress,
      solBalance: solBalance / 1e9, // Convert lamports to SOL
      tokens: tokenBalances,
      timestamp: new Date().toISOString(),
      riskMetrics,
      marketInsights,
      analysis: this.generateAnalysis(solBalance / 1e9, tokenBalances, riskMetrics)
    };
  }

  /**
   * Generate portfolio analysis
   */
  private generateAnalysis(solBalance: number, tokens: any[], riskMetrics: any) {
    return {
      riskLevel: this.estimateRiskLevel(solBalance, tokens),
      diversification: this.calculateDiversification(tokens),
      concentrationRisk: riskMetrics.concentrationRisk,
      volatilityEstimate: riskMetrics.volatilityEstimate,
      diversificationScore: riskMetrics.diversificationScore,
      recommendations: this.generateRecommendations(solBalance, tokens, riskMetrics)
    };
  }

  /**
   * Estimate risk level
   */
  private estimateRiskLevel(solBalance: number, tokens: any[]) {
    // Simplified risk calculation
    if (tokens.length === 0) return 'LOW';
    if (tokens.length <= 2) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Calculate diversification
   */
  private calculateDiversification(tokens: any[]) {
    return tokens.length;
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(solBalance: number, tokens: any[], riskMetrics: any) {
    const recommendations = [];

    if (solBalance < 1) {
      recommendations.push('Consider increasing SOL balance for transaction fees');
    }

    if (tokens.length < 3) {
      recommendations.push('Diversify portfolio with additional assets');
    }

    // Add recommendations based on risk metrics
    if (riskMetrics && riskMetrics.concentrationRisk > 0.7) {
      recommendations.push('High concentration risk detected - consider diversifying into more token types');
    }

    if (riskMetrics && riskMetrics.diversificationScore < 0.5) {
      recommendations.push('Portfolio diversification could be improved');
    }

    if (riskMetrics && riskMetrics.solExposure > 0.7) {
      recommendations.push('High SOL exposure - consider diversifying into other assets');
    }

    return recommendations;
  }

  /**
   * Get rebalancing recommendations
   */
  async getRecommendations(strategy: 'conservative' | 'moderate' | 'aggressive' = 'moderate') {
    const strategies = {
      conservative: {
        description: 'Focus on stablecoins and blue-chip tokens',
        allocations: [
          { asset: 'USDC', percentage: 50 },
          { asset: 'SOL', percentage: 30 },
          { asset: 'other', percentage: 20 }
        ]
      },
      moderate: {
        description: 'Balanced mix of growth and stability',
        allocations: [
          { asset: 'SOL', percentage: 35 },
          { asset: 'USDC', percentage: 25 },
          { asset: 'JLP', percentage: 20 },
          { asset: 'other', percentage: 20 }
        ]
      },
      aggressive: {
        description: 'Focus on growth tokens and yield farming',
        allocations: [
          { asset: 'SOL', percentage: 30 },
          { asset: 'growth_tokens', percentage: 50 },
          { asset: 'yield_farming', percentage: 20 }
        ]
      }
    };

    return strategies[strategy];
  }

  /**
   * Get market insights
   */
  async getMarketInsights(protocol: string) {
    // Placeholder for market insights
    return {
      protocol,
      trend: 'bullish',
      volumeChange: '+15%',
      pricePrediction: 'expect 10-15% growth in next 30 days',
      riskFactors: ['market_volatility', 'regulatory_changes'],
      confidence: 0.75
    };
  }

  /**
   * Get detailed risk analysis for a portfolio
   */
  async getRiskAnalysis(walletAddress: string) {
    return await this.advancedAnalyzer.calculateRiskMetrics(walletAddress);
  }

  /**
   * Generate rebalancing recommendations for a specific wallet
   */
  async getPortfolioRebalancingRecommendations(
    walletAddress: string,
    strategy: 'conservative' | 'moderate' | 'aggressive' = 'moderate'
  ) {
    const targetAllocation = this.getStrategyAllocation(strategy);
    return await this.advancedAnalyzer.generateRebalancingRecommendations(walletAddress, targetAllocation);
  }

  /**
   * Get allocation based on strategy
   */
  private getStrategyAllocation(strategy: 'conservative' | 'moderate' | 'aggressive') {
    switch (strategy) {
      case 'conservative':
        return [
          { token: 'USDC', percentage: 0.50 },
          { token: 'SOL', percentage: 0.30 },
          { token: 'other', percentage: 0.20 }
        ];
      case 'aggressive':
        return [
          { token: 'SOL', percentage: 0.30 },
          { token: 'growth_tokens', percentage: 0.50 },
          { token: 'yield_farming', percentage: 0.20 }
        ];
      case 'moderate':
      default:
        return [
          { token: 'SOL', percentage: 0.35 },
          { token: 'USDC', percentage: 0.25 },
          { token: 'JLP', percentage: 0.20 },
          { token: 'other', percentage: 0.20 }
        ];
    }
  }
}

/**
 * Express server for API endpoints
 */
export function createServer(analyzer: OptimusAnalyzer) {
  const app = express();
  app.use(express.json());

  app.get('/api/portfolio/:address', async (req, res) => {
    try {
      const result = await analyzer.analyzePortfolio(req.params.address);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/recommendations/:strategy?', (req, res) => {
    try {
      const strategy = req.params.strategy as 'conservative' | 'moderate' | 'aggressive' || 'moderate';
      const result = analyzer.getRecommendations(strategy);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/insights/:protocol', async (req, res) => {
    try {
      const result = await analyzer.getMarketInsights(req.params.protocol);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/risk/:address', async (req, res) => {
    try {
      const result = await analyzer.getRiskAnalysis(req.params.address);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/rebalance/:address/:strategy?', async (req, res) => {
    try {
      const strategy = req.params.strategy as 'conservative' | 'moderate' | 'aggressive' || 'moderate';
      const result = await analyzer.getPortfolioRebalancingRecommendations(req.params.address, strategy);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return app;
}

// If running directly
if (require.main === module) {
  const analyzer = new OptimusAnalyzer();
  const app = createServer(analyzer);
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Optimus Portfolio Analyzer listening on port ${PORT}`);
  });
}