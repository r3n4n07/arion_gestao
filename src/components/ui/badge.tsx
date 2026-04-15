import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

type BadgeProps = PropsWithChildren<{
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}>;

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
        variant === 'success' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
        variant === 'warning' && 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
        variant === 'danger' && 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
        variant === 'info' && 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300',
        variant === 'neutral' && 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
      )}
    >
      {children}
    </span>
  );
}
