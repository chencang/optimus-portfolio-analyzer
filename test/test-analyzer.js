const { OptimusAnalyzer } = require('../dist/index');

async function testAnalyzer() {
  console.log('🧪 Testing Optimus Portfolio Analyzer...');
  
  // Create analyzer instance
  const analyzer = new OptimusAnalyzer();
  
  // Test with a sample wallet address (replace with actual Solana address for real testing)
  const testWallet = 'So11111111111111111111111111111111111111112'; // This is the wrapped SOL address
  
  try {
    console.log('🔍 Getting portfolio analysis...');
    const portfolioAnalysis = await analyzer.analyzePortfolio(testWallet);
    console.log('✅ Portfolio analysis complete:');
    console.log(JSON.stringify(portfolioAnalysis, null, 2));
    
    console.log('\n🔍 Getting risk analysis...');
    const riskAnalysis = await analyzer.getRiskAnalysis(testWallet);
    console.log('✅ Risk analysis complete:');
    console.log(JSON.stringify(riskAnalysis, null, 2));
    
    console.log('\n🔍 Getting rebalancing recommendations...');
    const rebalanceRecs = await analyzer.getPortfolioRebalancingRecommendations(testWallet, 'moderate');
    console.log('✅ Rebalancing recommendations complete:');
    console.log(JSON.stringify(rebalanceRecs, null, 2));
    
    console.log('\n🎯 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAnalyzer();