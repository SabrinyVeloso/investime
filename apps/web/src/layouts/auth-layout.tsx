import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl lg:flex-row">
        <aside className="relative flex flex-1 flex-col justify-between gap-10 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.35),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.2),transparent_26%)]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Investime</p>
              <h1 className="text-xl font-semibold">Controle pessoal premium</h1>
            </div>
          </div>
          <div className="relative max-w-xl space-y-6">
            <p className="text-4xl font-semibold leading-tight sm:text-5xl">
              Uma experiência financeira mobile first, elegante e pronta para crescer.
            </p>
            <p className="max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
              Organize patrimônio, dividendos, metas, aportes e relatórios em um único sistema com visual premium e arquitetura escalável.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Dashboard inteligente</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Mobile first</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">JWT + PostgreSQL</span>
            </div>
          </div>
          <div className="relative text-sm text-slate-400">
            <p>Frontend Vercel</p>
            <p>Backend Render ou Railway</p>
          </div>
        </aside>
        <main className="flex flex-1 items-center justify-center bg-slate-950/85 p-4 sm:p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
