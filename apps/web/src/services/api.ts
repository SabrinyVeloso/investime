import {
  createLocalInvestment,
  deleteLocalInvestment,
  getLocalInvestments,
  getLocalSummary,
  updateLocalInvestment,
} from './local-investments';

const API_BASE_URL = import.meta.env.VITE_API_URL;

type LocalPayload = {
  name?: string;
  category?: string;
  quantity?: number;
  purchasePrice?: number;
  currentPrice?: number;
  purchaseDate?: string;
  notes?: string;
};

async function handleLocalRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();
  const body = init?.body ? (JSON.parse(String(init.body)) as LocalPayload) : undefined;

  if (path === '/investments/summary' || path === '/summary') {
    return getLocalSummary() as T;
  }

  if (path === '/investments' && method === 'GET') {
    return getLocalInvestments() as T;
  }

  if (path === '/investments' && method === 'POST' && body) {
    return createLocalInvestment({
      name: body.name ?? '',
      category: body.category ?? 'Outro',
      quantity: body.quantity ?? 0,
      purchasePrice: body.purchasePrice ?? 0,
      currentPrice: body.currentPrice ?? 0,
      purchaseDate: body.purchaseDate ?? new Date().toISOString().slice(0, 10),
      notes: body.notes ?? '',
    }) as T;
  }

  const match = path.match(/^\/investments\/([^/]+)$/);
  if (match && body && (method === 'PUT' || method === 'PATCH')) {
    return updateLocalInvestment(match[1], {
      name: body.name ?? '',
      category: body.category ?? 'Outro',
      quantity: body.quantity ?? 0,
      purchasePrice: body.purchasePrice ?? 0,
      currentPrice: body.currentPrice ?? 0,
      purchaseDate: body.purchaseDate ?? new Date().toISOString().slice(0, 10),
      notes: body.notes ?? '',
    }) as T;
  }

  if (match && method === 'DELETE') {
    deleteLocalInvestment(match[1]);
    return undefined as T;
  }

  throw new Error('Rota local não suportada');
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    return handleLocalRequest<T>(path, init);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    if (typeof window !== 'undefined') {
      return handleLocalRequest<T>(path, init);
    }
    throw new Error(payload?.message ?? 'Falha na requisição');
  }

  return response.json() as Promise<T>;
}
