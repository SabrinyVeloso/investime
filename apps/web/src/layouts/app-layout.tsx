import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, MoonStar, SunMedium, Wallet } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

export function AppLayout() {
  const { mode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="theme-shell">
      <header className="theme-header border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
              <Wallet size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] theme-subtle">Investime</p>
              <p className="text-sm font-semibold theme-text">Investimentos manuais</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="theme-button-secondary p-3">
              {mode === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} className="theme-button-secondary p-3 lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="theme-panel border-t px-4 py-3 lg:hidden">
            <div className="mx-auto flex max-w-6xl gap-2 text-sm theme-muted">
              <a className="theme-button-secondary px-4 py-2" href="#dashboard">Dashboard</a>
              <a className="theme-button-secondary px-4 py-2" href="#form">Cadastro</a>
              <a className="theme-button-secondary px-4 py-2" href="#lista">Lista</a>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <nav className="theme-panel fixed inset-x-3 bottom-3 z-40 rounded-3xl px-2 py-2 lg:hidden">
        <div className="grid grid-cols-3 gap-1 text-xs">
          <a className="rounded-2xl bg-brand-500 px-2 py-2 text-center text-white" href="#dashboard">Resumo</a>
          <a className="theme-button-secondary px-2 py-2 text-center" href="#form">Novo</a>
          <a className="theme-button-secondary px-2 py-2 text-center" href="#lista">Lista</a>
        </div>
      </nav>
    </div>
  );
}
