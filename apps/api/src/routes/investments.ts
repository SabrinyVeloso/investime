import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { query } from '../lib/db';

export const investmentsRouter = Router();

type InvestmentRow = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  purchase_price: number;
  current_price: number;
  purchase_date: string;
  notes: string;
  invested_value: number;
  current_value: number;
  profit: number;
  return_percent: number;
  created_at: string;
  updated_at: string;
};

type InvestmentInput = {
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes?: string;
};

function mapInvestment(row: InvestmentRow) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    quantity: Number(row.quantity),
    purchasePrice: Number(row.purchase_price),
    currentPrice: Number(row.current_price),
    purchaseDate: row.purchase_date,
    notes: row.notes,
    investedValue: Number(row.invested_value),
    currentValue: Number(row.current_value),
    profit: Number(row.profit),
    returnPercent: Number(row.return_percent),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function calculateTotals(input: InvestmentInput) {
  const investedValue = Number(input.quantity) * Number(input.purchasePrice);
  const currentValue = Number(input.quantity) * Number(input.currentPrice);
  const profit = currentValue - investedValue;
  const returnPercent = investedValue > 0 ? (profit / investedValue) * 100 : 0;
  return { investedValue, currentValue, profit, returnPercent };
}

investmentsRouter.get('/', async (_req, res) => {
  const result = await query<InvestmentRow>(`SELECT * FROM investments ORDER BY created_at DESC`);
  res.json(result.rows.map(mapInvestment));
});

investmentsRouter.post('/', async (req, res) => {
  const { name, category, quantity, purchasePrice, currentPrice, purchaseDate, notes = '' } = req.body as InvestmentInput;
  if (!name || !category || !purchaseDate) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  const totals = calculateTotals({ name, category, quantity, purchasePrice, currentPrice, purchaseDate, notes });
  const id = randomUUID();
  const result = await query<InvestmentRow>(
    `INSERT INTO investments (
      id, name, category, quantity, purchase_price, current_price, purchase_date, notes,
      invested_value, current_value, profit, return_percent
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *`,
    [
      id,
      name,
      category,
      quantity,
      purchasePrice,
      currentPrice,
      purchaseDate,
      notes,
      totals.investedValue,
      totals.currentValue,
      totals.profit,
      totals.returnPercent,
    ],
  );

  res.status(201).json(mapInvestment(result.rows[0]));
});

investmentsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, purchasePrice, currentPrice, purchaseDate, notes = '' } = req.body as InvestmentInput;
  const totals = calculateTotals({ name, category, quantity, purchasePrice, currentPrice, purchaseDate, notes });

  const result = await query<InvestmentRow>(
    `UPDATE investments
     SET name = $2,
         category = $3,
         quantity = $4,
         purchase_price = $5,
         current_price = $6,
         purchase_date = $7,
         notes = $8,
         invested_value = $9,
         current_value = $10,
         profit = $11,
         return_percent = $12,
         updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      name,
      category,
      quantity,
      purchasePrice,
      currentPrice,
      purchaseDate,
      notes,
      totals.investedValue,
      totals.currentValue,
      totals.profit,
      totals.returnPercent,
    ],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Investimento não encontrado' });
  }

  res.json(mapInvestment(result.rows[0]));
});

investmentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await query(`DELETE FROM investments WHERE id = $1`, [id]);
  res.status(204).send();
});

investmentsRouter.get('/summary', async (_req, res) => {
  const result = await query<{ total_invested: number; total_profit: number; total_investments: number }>(
    `SELECT
      COALESCE(SUM(invested_value), 0) AS total_invested,
      COALESCE(SUM(profit), 0) AS total_profit,
      COUNT(*)::int AS total_investments
     FROM investments`,
  );

  const summary = result.rows[0];
  res.json({
    totalInvested: Number(summary.total_invested),
    totalProfit: Number(summary.total_profit),
    totalInvestments: Number(summary.total_investments),
  });
});
