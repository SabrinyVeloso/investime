import type { CashFlow, Goal, Holding, User } from '@/types/models';

export const demoUser: User = {
  id: 'usr_01',
  name: 'Marina Almeida',
  email: 'marina@investime.app',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
};

export const dashboardMetrics = [
  { label: 'Patrimônio total', value: 428560.42, change: 14.2, trend: 'up' as const },
  { label: 'Valor investido', value: 351200.1, change: 8.1, trend: 'up' as const },
  { label: 'Valor atual', value: 428560.42, change: 12.8, trend: 'up' as const },
  { label: 'Lucro / Prejuízo', value: 77360.32, change: 21.4, trend: 'up' as const },
  { label: 'Rentabilidade', value: 22.03, change: 1.4, trend: 'up' as const, percent: true },
  { label: 'Dividendos do mês', value: 3412.88, change: 9.5, trend: 'up' as const },
  { label: 'Dividendos do ano', value: 28422.41, change: 18.6, trend: 'up' as const },
  { label: 'Total de ativos', value: 27, change: 3, trend: 'up' as const },
  { label: 'Total de categorias', value: 9, change: 0, trend: 'flat' as const },
  { label: 'Caixa disponível', value: 12450.5, change: 2.3, trend: 'up' as const },
];

export const holdings: Holding[] = [
  {
    id: 'h1',
    name: 'WEG',
    ticker: 'WEGE3',
    category: 'Acoes',
    quantity: 250,
    averagePrice: 34.8,
    currentPrice: 39.42,
    investedValue: 8700,
    currentValue: 9855,
    dividends: 214.9,
    favorite: true,
    broker: 'XP',
  },
  {
    id: 'h2',
    name: 'Fiis High Grade',
    ticker: 'HGLG11',
    category: 'FIIs',
    quantity: 120,
    averagePrice: 163.7,
    currentPrice: 172.34,
    investedValue: 19644,
    currentValue: 20680.8,
    dividends: 1880.4,
    favorite: true,
    broker: 'Inter',
  },
  {
    id: 'h3',
    name: 'BNDES Debêntures',
    ticker: 'DEB24',
    category: 'Debentures',
    quantity: 80,
    averagePrice: 101.2,
    currentPrice: 105.18,
    investedValue: 8096,
    currentValue: 8414.4,
    dividends: 428.2,
    broker: 'BTG',
  },
  {
    id: 'h4',
    name: 'Bitcoin',
    ticker: 'BTC',
    category: 'Criptomoedas',
    quantity: 0.85,
    averagePrice: 188500,
    currentPrice: 215000,
    investedValue: 160225,
    currentValue: 182750,
    dividends: 0,
    broker: 'Binance',
  },
  {
    id: 'h5',
    name: 'Tesouro Selic 2029',
    ticker: 'SELIC29',
    category: 'Tesouro Direto',
    quantity: 33,
    averagePrice: 1221,
    currentPrice: 1268.44,
    investedValue: 40293,
    currentValue: 41858.52,
    dividends: 0,
    broker: 'Tesouro Direto',
  },
];

export const equitySeries = [
  { month: 'Jan', patrimonio: 312000, aportes: 7200, dividendos: 2200, rentabilidade: 11.4 },
  { month: 'Fev', patrimonio: 318400, aportes: 8100, dividendos: 1840, rentabilidade: 12.2 },
  { month: 'Mar', patrimonio: 330500, aportes: 9000, dividendos: 2550, rentabilidade: 13.8 },
  { month: 'Abr', patrimonio: 341200, aportes: 7600, dividendos: 2680, rentabilidade: 14.1 },
  { month: 'Mai', patrimonio: 362900, aportes: 11000, dividendos: 2890, rentabilidade: 16.9 },
  { month: 'Jun', patrimonio: 388100, aportes: 12500, dividendos: 3040, rentabilidade: 19.2 },
  { month: 'Jul', patrimonio: 412800, aportes: 14600, dividendos: 3210, rentabilidade: 21.5 },
  { month: 'Ago', patrimonio: 428560, aportes: 9800, dividendos: 3412, rentabilidade: 22.0 },
];

export const categoryDistribution = [
  { name: 'Ações', value: 28 },
  { name: 'FIIs', value: 21 },
  { name: 'ETFs', value: 14 },
  { name: 'Tesouro', value: 12 },
  { name: 'Cripto', value: 9 },
  { name: 'Outros', value: 16 },
];

export const monthlyDividends = [
  { month: 'Jan', value: 2210 },
  { month: 'Fev', value: 1984 },
  { month: 'Mar', value: 2550 },
  { month: 'Abr', value: 2680 },
  { month: 'Mai', value: 2890 },
  { month: 'Jun', value: 3040 },
  { month: 'Jul', value: 3210 },
  { month: 'Ago', value: 3412 },
];

export const cashFlows: CashFlow[] = [
  { id: 'cf1', type: 'aporte', title: 'Aporte em WEGE3', amount: 4500, date: '2026-08-02', category: 'Acoes' },
  { id: 'cf2', type: 'dividendo', title: 'Rendimento HGLG11', amount: 188.5, date: '2026-08-01', category: 'FIIs' },
  { id: 'cf3', type: 'compra', title: 'Compra BTC', amount: 7500, date: '2026-07-29', category: 'Criptomoedas' },
  { id: 'cf4', type: 'venda', title: 'Venda parcial ETF', amount: 6200, date: '2026-07-22', category: 'ETFs' },
];

export const goals: Goal[] = [
  { id: 'g1', name: 'Patrimônio de R$ 500 mil', target: 500000, current: 428560, deadline: '2027-12-31' },
  { id: 'g2', name: 'Dividendos de R$ 5 mil/mês', target: 5000, current: 3412, deadline: '2026-12-31' },
  { id: 'g3', name: 'Reserva de emergência', target: 60000, current: 46000, deadline: '2026-10-31' },
  { id: 'g4', name: 'Independência financeira', target: 3000000, current: 428560, deadline: '2035-12-31' },
];

export const notifications = [
  { id: 'n1', title: 'Meta de dividendos 68% concluída', detail: 'Faltam R$ 1.588 para a próxima faixa.', time: '2h atrás' },
  { id: 'n2', title: 'Dividendo recebido em HGLG11', detail: 'R$ 188,50 creditados na conta da corretora.', time: '5h atrás' },
  { id: 'n3', title: 'Aporte pendente', detail: 'Seu aporte mensal ainda não foi concluído.', time: '1d atrás' },
];
