import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();
  const origin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  app.use(helmet());
  app.use(cors({ origin, credentials: true }));
  app.use(express.json({ limit: '2mb' }));

  app.get('/', (_req, res) => {
    res.json({
      name: 'Investime API',
      version: '1.0.0',
      status: 'running',
    });
  });

  app.use('/api', apiRouter);

  app.use((_req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
  });

  return app;
}
