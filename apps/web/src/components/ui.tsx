import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { formatCurrency } from '@/utils/format';

export function Surface({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`surface ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.35em] text-brand-500">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  accent = 'blue',
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  accent?: 'blue' | 'emerald' | 'rose';
}) {
  const accentStyles = {
    blue: 'from-brand-500/25 to-brand-500/5 text-brand-500',
    emerald: 'from-emerald-500/25 to-emerald-500/5 text-emerald-400',
    rose: 'from-rose-500/25 to-rose-500/5 text-rose-400',
  } as const;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }} className="surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{title}</p>
          <strong className="mt-3 block text-2xl font-semibold text-white">{value}</strong>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 ${accentStyles[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
      <div className="mb-4 rounded-2xl bg-brand-500/15 p-4 text-brand-500">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400">{description}</p>
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{children}</span>;
}
