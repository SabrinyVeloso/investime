export function calculateAveragePrice(totalInvested: number, quantity: number) {
  return quantity > 0 ? totalInvested / quantity : 0;
}

export function calculateProfit(currentValue: number, investedValue: number) {
  return currentValue - investedValue;
}

export function calculateReturnPercent(currentValue: number, investedValue: number) {
  return investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0;
}

export function calculateDividendYield(dividends: number, currentValue: number) {
  return currentValue > 0 ? (dividends / currentValue) * 100 : 0;
}

export function calculateYieldOnCost(dividends: number, investedValue: number) {
  return investedValue > 0 ? (dividends / investedValue) * 100 : 0;
}
