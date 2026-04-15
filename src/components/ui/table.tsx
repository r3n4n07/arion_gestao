import type { PropsWithChildren, ReactNode } from 'react';

export function Table({ children }: PropsWithChildren) {
  return <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">{children}</div>;
}

export function TableElement({ children }: PropsWithChildren) {
  return <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">{children}</table>;
}

export function THead({ children }: PropsWithChildren) {
  return <thead className="bg-slate-100/80 dark:bg-slate-900/80">{children}</thead>;
}

export function TBody({ children }: PropsWithChildren) {
  return <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">{children}</tbody>;
}

export function TH({ children }: PropsWithChildren) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </th>
  );
}

export function TD({ children }: PropsWithChildren<{ children: ReactNode }>) {
  return <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{children}</td>;
}
