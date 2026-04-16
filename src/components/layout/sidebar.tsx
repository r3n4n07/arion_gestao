import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/escala', label: 'Escala' },
  { to: '/ips', label: 'IPs' },
  { to: '/usuarios', label: 'Usuários' },
  { to: '/equipamentos', label: 'Equipamentos' },
];

type SidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-4 w-4 transition-transform duration-300', collapsed && 'rotate-180')}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function Sidebar({ open, collapsed, onClose, onToggleCollapse }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-900/20 transition md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col overflow-hidden border-r border-orange-300 bg-white px-4 py-5 text-slate-800 shadow-[0_24px_44px_-30px_rgba(74,79,87,0.24)] transition-all duration-300',
          collapsed ? 'w-[5.5rem] md:w-[5.5rem]' : 'w-72',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-8 top-0 h-48 w-48 rounded-full bg-aqua-500/10 blur-3xl" />
          <div className="absolute left-0 right-0 top-0 h-20 bg-aqua-500/8" />
        </div>

        <div className={cn('relative mb-8 flex items-start', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-orange-300 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-aqua-700">
                Arion
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Gestão</h1>
                <p className="mt-1 text-sm text-slate-500">Operação corporativa</p>
              </div>
            </div>
          )}

          <div className={cn('flex gap-2', collapsed && 'flex-col items-center')}>
            <button
              type="button"
              aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-300 bg-white text-slate-700 shadow-[0_16px_28px_-22px_rgba(74,79,87,0.18)] transition hover:bg-slate-50"
              onClick={onToggleCollapse}
            >
              <CollapseIcon collapsed={collapsed} />
            </button>
            {open && (
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-300 bg-white text-slate-700 shadow-[0_16px_28px_-22px_rgba(74,79,87,0.18)] transition hover:bg-slate-50 md:hidden"
                onClick={onClose}
              >
                x
              </button>
            )}
          </div>
        </div>

        {!collapsed && (
          <nav className="relative space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center rounded-[1.25rem] border px-4 py-3 text-sm font-medium transition duration-300',
                    isActive
                      ? 'border-aqua-500/35 bg-aqua-500 text-white shadow-[0_22px_38px_-26px_rgba(16,201,160,0.7)]'
                      : 'border-transparent bg-white text-slate-600 hover:border-orange-300 hover:bg-slate-50 hover:text-slate-900',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </aside>
    </>
  );
}
