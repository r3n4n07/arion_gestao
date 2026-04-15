import type { PropsWithChildren } from 'react';
import { Button } from './button';

type ModalProps = PropsWithChildren<{
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
}>;

export function Modal({ title, description, open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
