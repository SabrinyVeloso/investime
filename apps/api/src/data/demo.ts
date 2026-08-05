import type { CashFlow, Goal, Holding, User } from '../types';

export const demoUser: User = {
  id: 'usr_01',
  name: 'Marina Almeida',
  email: 'marina@investime.app',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
};

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
];

export const goals: Goal[] = [
  { id: 'g1', name: 'Patrimônio de R$ 500 mil', target: 500000, current: 428560, deadline: '2027-12-31' },
  { id: 'g2', name: 'Dividendos de R$ 5 mil/mês', target: 5000, current: 3412, deadline: '2026-12-31' },
];

export const cashFlows: CashFlow[] = [
  { id: 'cf1', type: 'aporte', title: 'Aporte em WEGE3', amount: 4500, date: '2026-08-02', category: 'Acoes' },
  { id: 'cf2', type: 'dividendo', title: 'Rendimento HGLG11', amount: 188.5, date: '2026-08-01', category: 'FIIs' },
];
