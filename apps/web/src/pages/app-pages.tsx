import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, Plus, Search, Trash2, Wallet } from 'lucide-react';
import { apiRequest } from '@/services/api';
import { formatCurrency, formatDate, formatPercent } from '@/utils/format';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Badge, EmptyState, SectionHeading, StatCard, Surface } from '@/components/ui';

export type InvestmentCategory = 'Ação' | 'FII' | 'Cripto' | 'ETF' | 'Outro';

export type Investment = {
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
};

type InvestmentInput = {
  name: string;
  category: InvestmentCategory;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  notes: string;
};

type Summary = {
  totalInvested: number;
  totalProfit: number;
  totalInvestments: number;
};

const categories: InvestmentCategory[] = ['Ação', 'FII', 'Cripto', 'ETF', 'Outro'];
const emptyFormValues: InvestmentInput = {
  name: '',
  category: 'Ação',
  quantity: 0,
  purchasePrice: 0,
  currentPrice: 0,
  purchaseDate: new Date().toISOString().slice(0, 10),
  notes: '',
};

function calculateValues(values: InvestmentInput) {
  const investedValue = values.quantity * values.purchasePrice;
  const currentValue = values.quantity * values.currentPrice;
  const profit = currentValue - investedValue;
  const returnPercent = investedValue > 0 ? (profit / investedValue) * 100 : 0;
  return { investedValue, currentValue, profit, returnPercent };
}

function InvestmentForm({
  editingInvestment,
  onSaved,
  onCancel,
}: {
  editingInvestment: Investment | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { register, handleSubmit, reset, watch } = useForm<InvestmentInput>({ defaultValues: emptyFormValues });
  const preview = calculateValues(watch());

  useEffect(() => {
    if (editingInvestment) {
      reset({
        name: editingInvestment.name,
        category: editingInvestment.category,
        quantity: editingInvestment.quantity,
        purchasePrice: editingInvestment.purchasePrice,
        currentPrice: editingInvestment.currentPrice,
        purchaseDate: editingInvestment.purchaseDate,
        notes: editingInvestment.notes,
      });
      return;
    }
    reset(emptyFormValues);
  }, [editingInvestment, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const payload = {
      ...values,
      quantity: Number(values.quantity),
      purchasePrice: Number(values.purchasePrice),
      currentPrice: Number(values.currentPrice),
    };

    await apiRequest(editingInvestment ? `/investments/${editingInvestment.id}` : '/investments', {
      method: editingInvestment ? 'PUT' : 'POST',
      body: JSON.stringify(payload),
    });

    reset(emptyFormValues);
    onCancel();
    onSaved();
  });

  return (
    <Surface className="p-5 lg:p-6" id="form">
      <SectionHeading
        eyebrow="Cadastro manual"
        title={editingInvestment ? 'Editar investimento' : 'Novo investimento'}
        description="Registre seus ativos manualmente, sem integração automática com corretoras ou cotações."
      />

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="app-label">Nome do investimento</span>
          <input className="app-input" {...register('name', { required: true })} placeholder="MXRF11, PETR4, Bitcoin..." />
        </label>

        <label className="space-y-2">
          <span className="app-label">Categoria</span>
          <select className="app-input" {...register('category', { required: true })}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="app-label">Data da compra</span>
          <input className="app-input" type="date" {...register('purchaseDate', { required: true })} />
        </label>

        <label className="space-y-2">
          <span className="app-label">Quantidade</span>
          <input className="app-input" type="number" step="0.0001" {...register('quantity', { valueAsNumber: true, required: true })} />
        </label>

        <label className="space-y-2">
          <span className="app-label">Valor pago por cota</span>
          <input className="app-input" type="number" step="0.01" {...register('purchasePrice', { valueAsNumber: true, required: true })} />
        </label>

        <label className="space-y-2">
          <span className="app-label">Valor atual por cota</span>
          <input className="app-input" type="number" step="0.01" {...register('currentPrice', { valueAsNumber: true, required: true })} />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="app-label">Observações</span>
          <textarea className="app-input min-h-24 resize-none" {...register('notes')} placeholder="Opcional" />
        </label>

        <div className="theme-soft-surface md:col-span-2 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Investido</p>
            <p className="mt-2 font-semibold theme-text">{formatCurrency(preview.investedValue)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Atual</p>
            <p className="mt-2 font-semibold theme-text">{formatCurrency(preview.currentValue)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Lucro</p>
            <p className={`mt-2 font-semibold ${preview.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{formatCurrency(preview.profit)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Rentabilidade</p>
            <p className={`mt-2 font-semibold ${preview.returnPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{formatPercent(preview.returnPercent)}</p>
          </div>
        </div>

        <button className="app-button-primary md:col-span-2" type="submit">
          <Plus size={18} />
          {editingInvestment ? 'Salvar alterações' : 'Salvar investimento'}
        </button>
        {editingInvestment ? (
          <button className="app-button-secondary md:col-span-2" type="button" onClick={onCancel}>
            Cancelar edição
          </button>
        ) : null}
      </form>
    </Surface>
  );
}

function InvestmentList({
  items,
  onEdit,
  onDelete,
}: {
  items: Investment[];
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Surface className="p-5 lg:p-6" id="lista">
      <SectionHeading
        eyebrow="Investimentos salvos"
        title="Lista de investimentos"
        description="Edite, exclua e pesquise seus registros manualmente a qualquer momento."
      />

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Nenhum investimento encontrado"
            description="Cadastre o primeiro ativo para começar a acompanhar seus resultados."
            icon={Wallet}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <Surface key={item.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold theme-text">{item.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>{item.category}</Badge>
                    <Badge>{item.quantity} un</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => onEdit(item)} className="theme-button-secondary p-2">
                    <Pencil size={16} />
                  </button>
                  <button type="button" onClick={() => onDelete(item.id)} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-500 dark:text-rose-300">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Investido</p>
                  <p className="mt-1 theme-text">{formatCurrency(item.investedValue)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Atual</p>
                  <p className="mt-1 theme-text">{formatCurrency(item.currentValue)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Lucro</p>
                  <p className={`mt-1 ${item.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{formatCurrency(item.profit)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] theme-subtle">Rent.</p>
                  <p className={`mt-1 ${item.returnPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{formatPercent(item.returnPercent)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm theme-muted">Compra em {formatDate(item.purchaseDate)}{item.notes ? ` · ${item.notes}` : ''}</p>
            </Surface>
          ))}
        </div>
      )}
    </Surface>
  );
}

export function InvestmentsTrackerPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalInvested: 0, totalProfit: 0, totalInvestments: 0 });
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(query, 200);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const [investmentsResponse, summaryResponse] = await Promise.all([
        apiRequest<Investment[]>('/investments'),
        apiRequest<Summary>('/investments/summary'),
      ]);
      setInvestments(investmentsResponse);
      setSummary(summaryResponse);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  const filteredInvestments = useMemo(() => {
    const search = debouncedQuery.toLowerCase();
    return investments.filter((item) => item.name.toLowerCase().includes(search));
  }, [debouncedQuery, investments]);

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este investimento?');
    if (!confirmed) return;

    await apiRequest(`/investments/${id}`, { method: 'DELETE' });
    await loadData();
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <section id="dashboard" className="grid gap-4 md:grid-cols-3">
        <StatCard title="Valor total investido" value={formatCurrency(summary.totalInvested)} icon={Wallet} />
        <StatCard title="Lucro total" value={formatCurrency(summary.totalProfit)} icon={Wallet} accent={summary.totalProfit >= 0 ? 'emerald' : 'rose'} />
        <StatCard title="Investimentos cadastrados" value={String(summary.totalInvestments)} icon={Search} />
      </section>

      {error ? (
        <Surface className="border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">
          {error}
        </Surface>
      ) : null}

      <InvestmentForm
        editingInvestment={editingInvestment}
        onSaved={loadData}
        onCancel={() => setEditingInvestment(null)}
      />

      <Surface className="p-5 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading
            eyebrow="Lista"
            title="Investimentos registrados"
            description="Pesquise pelo nome e acompanhe seus resultados de forma simples e rápida."
          />
          <div className="relative sm:w-80">
            <Search className="absolute left-4 top-3.5 theme-subtle" size={18} />
            <input
              className="app-input pl-11"
              placeholder="Pesquisar investimento"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <p className="text-sm theme-muted">Carregando investimentos...</p>
          ) : (
            <InvestmentList items={filteredInvestments} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </Surface>
    </div>
  );
}
