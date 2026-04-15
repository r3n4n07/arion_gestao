import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

type CardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
}>;

export function Card({ title, description, className, children }: CardProps) {
  return (
    <section
      className={cn(
        'rounded-[2rem] border border-white/30 bg-white/12 p-5 shadow-soft backdrop-blur-xl transition duration-300 dark:border-white/10 dark:bg-white/5',
        className,
      )}
    >
      {(title || description) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-slate-600/90 dark:text-slate-300/80">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
