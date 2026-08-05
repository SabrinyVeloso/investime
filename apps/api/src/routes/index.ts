import { Router } from 'express';
import { authRouter } from './auth';
import { portfolioRouter } from './portfolio';
import { investmentsRouter } from './investments';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/portfolio', portfolioRouter);
apiRouter.use('/investments', investmentsRouter);

apiRouter.get('/summary', (_req, res) => {
  res.json({ totalInvested: 0, totalProfit: 0, totalInvestments: 0 });
});

apiRouter.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'investime-api' });
});
