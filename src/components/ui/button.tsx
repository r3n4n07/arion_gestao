import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md';
  }
>;

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-aqua-500/40 disabled:cursor-not-allowed disabled:opacity-60',
        size === 'md' ? 'h-11 px-4 text-sm' : 'h-9 px-3 text-xs',
        variant === 'primary' &&
          'bg-aqua-500 text-slate-950 shadow-soft hover:bg-aqua-600',
        variant === 'secondary' &&
          'border border-slate-200 bg-white text-slate-700 hover:border-aqua-400 hover:text-aqua-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100',
        variant === 'ghost' &&
          'bg-transparent text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800',
        variant === 'danger' &&
          'bg-ember-500 text-white hover:bg-ember-600',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
