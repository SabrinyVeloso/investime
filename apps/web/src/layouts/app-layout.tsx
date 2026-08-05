import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, MoonStar, SunMedium, Wallet } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

export function AppLayout() {
  const { mode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
              <Wallet size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Investime</p>
              <p className="text-sm font-semibold">Investimentos manuais</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              {mode === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
            <div className="mx-auto flex max-w-6xl gap-2 text-sm text-slate-300">
              <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2" href="#dashboard">Dashboard</a>
              <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2" href="#form">Cadastro</a>
              <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2" href="#lista">Lista</a>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-white/10 bg-slate-950/95 px-2 py-2 shadow-glass backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-3 gap-1 text-xs">
          <a className="rounded-2xl bg-brand-500 px-2 py-2 text-center text-white" href="#dashboard">Resumo</a>
          <a className="rounded-2xl bg-white/5 px-2 py-2 text-center text-slate-300" href="#form">Novo</a>
          <a className="rounded-2xl bg-white/5 px-2 py-2 text-center text-slate-300" href="#lista">Lista</a>
        </div>
      </nav>
    </div>
  );
}
