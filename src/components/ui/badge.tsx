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
        variant === 'success' && 'bg-aqua-500/14 text-aqua-700',
        variant === 'warning' && 'bg-ember-500/14 text-ember-600',
        variant === 'danger' && 'bg-ember-500/18 text-ember-600',
        variant === 'info' && 'bg-slate-500/12 text-slate-700',
        variant === 'neutral' && 'bg-white/45 text-slate-600 backdrop-blur-xl',
      )}
    >
      {children}
    </span>
  );
}
