import type { PropsWithChildren, ReactNode } from 'react';

export function Table({ children }: PropsWithChildren) {
  return <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/45 backdrop-blur-xl">{children}</div>;
}

export function TableElement({ children }: PropsWithChildren) {
  return <table className="min-w-full divide-y divide-slate-200/70">{children}</table>;
}

export function THead({ children }: PropsWithChildren) {
  return <thead className="bg-white/60">{children}</thead>;
}

export function TBody({ children }: PropsWithChildren) {
  return <tbody className="divide-y divide-slate-100 bg-transparent">{children}</tbody>;
}

export function TH({ children }: PropsWithChildren) {
  return <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</th>;
}

export function TD({ children }: PropsWithChildren<{ children: ReactNode }>) {
  return <td className="px-4 py-4 text-sm text-slate-600">{children}</td>;
}
