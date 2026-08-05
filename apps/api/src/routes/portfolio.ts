import { Router } from 'express';
import { cashFlows, goals, holdings, demoUser } from '../data/demo';
import { calculateDividendYield, calculateProfit, calculateReturnPercent } from '../utils/calculations';
import { authMiddleware } from '../middleware/auth';

export const portfolioRouter = Router();

portfolioRouter.use(authMiddleware);

portfolioRouter.get('/summary', (_req, res) => {
  const investedValue = holdings.reduce((sum, item) => sum + item.investedValue, 0);
  const currentValue = holdings.reduce((sum, item) => sum + item.currentValue, 0);
  const dividendsYear = holdings.reduce((sum, item) => sum + item.dividends, 0);

  res.json({
    user: demoUser,
    metrics: {
      portfolioValue: currentValue,
      investedValue,
      profit: calculateProfit(currentValue, investedValue),
      returnPercent: calculateReturnPercent(currentValue, investedValue),
      monthlyDividends: 3412.88,
      yearlyDividends: dividendsYear,
      assetCount: holdings.length,
      categoryCount: 9,
      cashBalance: 12450.5,
    },
    holdings: holdings.map((item) => ({
      ...item,
      profit: calculateProfit(item.currentValue, item.investedValue),
      returnPercent: calculateReturnPercent(item.currentValue, item.investedValue),
      dividendYield: calculateDividendYield(item.dividends, item.currentValue),
    })),
    goals,
    cashFlows,
  });
});
