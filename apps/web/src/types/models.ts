export type ThemeMode = 'dark' | 'light';

export type InvestmentCategory = 'Ação' | 'FII' | 'Cripto' | 'ETF' | 'Outro';

export interface Investment {
  id: string;
  name: string;
  category: InvestmentCategory;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes: string;
  investedValue: number;
  currentValue: number;
  profit: number;
  returnPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentSummary {
  totalInvested: number;
  totalProfit: number;
  totalInvestments: number;
}

export type AssetCategory =
  | 'Acoes'
  | 'FIIs'
  | 'ETFs'
  | 'Criptomoedas'
  | 'Tesouro Direto'
  | 'CDB'
  | 'LCI'
  | 'LCA'
  | 'Fundos'
  | 'BDRs'
  | 'Stocks'
  | 'REITs'
  | 'Debentures'
  | 'Outros';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Holding {
  id: string;
  name: string;
  ticker: string;
  category: AssetCategory;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  investedValue: number;
  currentValue: number;
  dividends: number;
  favorite?: boolean;
  broker: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export interface CashFlow {
  id: string;
  type: 'aporte' | 'dividendo' | 'compra' | 'venda';
  title: string;
  amount: number;
  date: string;
  category: AssetCategory | 'Caixa';
}
