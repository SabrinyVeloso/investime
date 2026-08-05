import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserRound, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Surface } from '@/components/ui';

type LoginValues = { email: string; password: string; remember: boolean };
type RegisterValues = { name: string; email: string; password: string };
type ForgotValues = { email: string };

function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <Surface className="p-6 sm:p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>
      <div className="mt-6">{children}</div>
    </Surface>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginValues>({
    defaultValues: { email: 'marina@investime.app', password: '123456', remember: true },
  });

  const onSubmit = handleSubmit(async (values) => {
    await login(values.email, values.password, values.remember);
    navigate('/app/dashboard');
  });

  return (
    <AuthCard title="Entrar" subtitle="Acesse sua carteira com segurança e acompanhe toda a organização financeira em um único painel.">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-2">
          <span className="app-label">E-mail</span>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input className="app-input pl-11" type="email" placeholder="voce@exemplo.com" {...register('email', { required: true })} />
          </div>
        </label>
        <label className="block space-y-2">
          <span className="app-label">Senha</span>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input className="app-input pl-11" type="password" placeholder="••••••••" {...register('password', { required: true })} />
          </div>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" className="rounded border-white/20 bg-transparent" {...register('remember')} />
          Manter login salvo
        </label>
        <button className="app-button-primary w-full" type="submit">
          Entrar
          <ArrowRight size={18} />
        </button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <Link to="/forgot-password" className="hover:text-white">
          Esqueci minha senha
        </Link>
        <Link to="/register" className="hover:text-white">
          Criar conta
        </Link>
      </div>
    </AuthCard>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: createAccount } = useAuth();
  const { register, handleSubmit } = useForm<RegisterValues>();

  return (
    <AuthCard title="Criar conta" subtitle="Configure um perfil pessoal para começar a centralizar patrimônio, aportes e dividendos.">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (values) => {
          await createAccount(values.name, values.email, values.password);
          navigate('/app/dashboard');
        })}
      >
        <label className="block space-y-2">
          <span className="app-label">Nome</span>
          <div className="relative">
            <UserRound className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input className="app-input pl-11" type="text" {...register('name', { required: true })} />
          </div>
        </label>
        <label className="block space-y-2">
          <span className="app-label">E-mail</span>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input className="app-input pl-11" type="email" {...register('email', { required: true })} />
          </div>
        </label>
        <label className="block space-y-2">
          <span className="app-label">Senha</span>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input className="app-input pl-11" type="password" {...register('password', { required: true })} />
          </div>
        </label>
        <button className="app-button-primary w-full" type="submit">
          Criar conta
        </button>
      </form>
      <div className="mt-4 text-sm text-slate-400">
        Já possui conta?{' '}
        <Link to="/login" className="text-white hover:underline">
          Entrar
        </Link>
      </div>
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<ForgotValues>();
  return (
    <AuthCard title="Recuperar senha" subtitle="Enviaremos um link para redefinir seu acesso com segurança.">
      <form onSubmit={handleSubmit(() => undefined)} className="space-y-4">
        <label className="block space-y-2">
          <span className="app-label">E-mail</span>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input className="app-input pl-11" type="email" {...register('email', { required: true })} />
          </div>
        </label>
        <button className="app-button-primary w-full" type="submit">
          Enviar link
        </button>
      </form>
      <div className="mt-4 text-sm text-slate-400">
        Lembrou sua senha?{' '}
        <Link to="/login" className="text-white hover:underline">
          Voltar ao login
        </Link>
      </div>
    </AuthCard>
  );
}
