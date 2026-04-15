import type { InputHTMLAttributes, PropsWithChildren, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Field({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-aqua-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100',
        props.className,
      )}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-aqua-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100',
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-aqua-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100',
        props.className,
      )}
    />
  );
}
