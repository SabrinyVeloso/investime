export type LocalInvestment = {
  id: string;
  name: string;
  category: string;
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
};

type LocalSummary = {
  totalInvested: number;
  totalProfit: number;
  totalInvestments: number;
};

type LocalInvestmentInput = {
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes?: string;
};

const storageKey = 'investime-local-investments';

const seedInvestments: LocalInvestment[] = [
  {
    id: 'inv_1',
    name: 'MXRF11',
    category: 'FII',
    quantity: 100,
    purchasePrice: 10.12,
    currentPrice: 11.02,
    purchaseDate: '2026-01-15',
    notes: 'Compra mensal',
    investedValue: 1012,
    currentValue: 1102,
    profit: 90,
    returnPercent: 8.8937,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function calculateTotals(input: LocalInvestmentInput) {
  const investedValue = Number(input.quantity) * Number(input.purchasePrice);
  const currentValue = Number(input.quantity) * Number(input.currentPrice);
  const profit = currentValue - investedValue;
  const returnPercent = investedValue > 0 ? (profit / investedValue) * 100 : 0;
  return { investedValue, currentValue, profit, returnPercent };
}

function readStore() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    localStorage.setItem(storageKey, JSON.stringify(seedInvestments));
    return [...seedInvestments];
  }

  try {
    return JSON.parse(raw) as LocalInvestment[];
  } catch {
    localStorage.setItem(storageKey, JSON.stringify(seedInvestments));
    return [...seedInvestments];
  }
}

function writeStore(items: LocalInvestment[]) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function normalizeInvestment(item: LocalInvestment) {
  return {
    ...item,
    quantity: Number(item.quantity),
    purchasePrice: Number(item.purchasePrice),
    currentPrice: Number(item.currentPrice),
    investedValue: Number(item.investedValue),
    currentValue: Number(item.currentValue),
    profit: Number(item.profit),
    returnPercent: Number(item.returnPercent),
  };
}

export function getLocalInvestments() {
  return readStore().map(normalizeInvestment);
}

export function getLocalSummary(): LocalSummary {
  const items = readStore();
  return items.reduce(
    (summary, item) => ({
      totalInvested: summary.totalInvested + Number(item.investedValue),
      totalProfit: summary.totalProfit + Number(item.profit),
      totalInvestments: summary.totalInvestments + 1,
    }),
    { totalInvested: 0, totalProfit: 0, totalInvestments: 0 },
  );
}

export function createLocalInvestment(input: LocalInvestmentInput) {
  const items = readStore();
  const totals = calculateTotals(input);
  const now = new Date().toISOString();
  const investment: LocalInvestment = {
    id: crypto.randomUUID(),
    name: input.name,
    category: input.category,
    quantity: Number(input.quantity),
    purchasePrice: Number(input.purchasePrice),
    currentPrice: Number(input.currentPrice),
    purchaseDate: input.purchaseDate,
    notes: input.notes ?? '',
    investedValue: totals.investedValue,
    currentValue: totals.currentValue,
    profit: totals.profit,
    returnPercent: totals.returnPercent,
    createdAt: now,
    updatedAt: now,
  };
  writeStore([investment, ...items]);
  return normalizeInvestment(investment);
}

export function updateLocalInvestment(id: string, input: LocalInvestmentInput) {
  const items = readStore();
  const totals = calculateTotals(input);
  const now = new Date().toISOString();
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name: input.name,
          category: input.category,
          quantity: Number(input.quantity),
          purchasePrice: Number(input.purchasePrice),
          currentPrice: Number(input.currentPrice),
          purchaseDate: input.purchaseDate,
          notes: input.notes ?? '',
          investedValue: totals.investedValue,
          currentValue: totals.currentValue,
          profit: totals.profit,
          returnPercent: totals.returnPercent,
          updatedAt: now,
        }
      : item,
  );
  writeStore(updatedItems);
  const updated = updatedItems.find((item) => item.id === id);
  if (!updated) throw new Error('Investimento não encontrado');
  return normalizeInvestment(updated);
}

export function deleteLocalInvestment(id: string) {
  const items = readStore();
  writeStore(items.filter((item) => item.id !== id));
}
