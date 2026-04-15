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
        variant === 'primary' && 'bg-aqua-500 text-white shadow-soft hover:bg-aqua-600',
        variant === 'secondary' &&
          'border border-white/60 bg-white/55 text-slate-700 backdrop-blur-xl hover:border-aqua-500/45 hover:bg-white/75 hover:text-aqua-700',
        variant === 'ghost' && 'bg-transparent text-slate-600 hover:bg-white/50',
        variant === 'danger' && 'bg-ember-500 text-white hover:bg-ember-600',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
