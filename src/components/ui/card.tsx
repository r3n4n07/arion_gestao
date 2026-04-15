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
        'rounded-[2rem] border border-white/55 bg-white/55 p-5 shadow-[0_24px_50px_-28px_rgba(74,79,87,0.28)] backdrop-blur-xl transition duration-300',
        className,
      )}
    >
      {(title || description) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-600/90">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
