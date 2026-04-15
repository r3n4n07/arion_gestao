import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ThemeToggle } from './theme-toggle';

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/escala', label: 'Escala' },
  { to: '/escala/editar', label: 'Editar escala' },
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
          'fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-sm transition md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(180deg,rgba(74,79,87,0.97),rgba(40,82,89,0.95),rgba(25,209,195,0.35))] px-4 py-5 text-white shadow-soft transition-all duration-300',
          collapsed ? 'w-[5.5rem] md:w-[5.5rem]' : 'w-72',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-8 top-0 h-48 w-48 rounded-full bg-aqua-500/22 blur-3xl" />
          <div className="absolute -right-14 bottom-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className={cn('relative mb-8 flex items-start', collapsed ? 'justify-center' : 'justify-between')}>
          <div className={cn('space-y-2', collapsed && 'hidden')}>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-aqua-300 backdrop-blur-xl">
              Arion
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Gestão</h1>
            </div>
          </div>
          {collapsed && (
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/10 text-lg font-semibold backdrop-blur-xl">
              A
            </div>
          )}
          <div className={cn('flex gap-2', collapsed && 'absolute right-0 top-0 flex-col')}>
            <button
              type="button"
              aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
              className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white/85 backdrop-blur-xl transition hover:bg-white/18"
              onClick={onToggleCollapse}
            >
              <CollapseIcon collapsed={collapsed} />
            </button>
            <button
              className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white/85 backdrop-blur-xl transition hover:bg-white/18 md:hidden"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        <nav className="relative space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-[1.25rem] border text-sm font-medium transition duration-300',
                  collapsed ? 'justify-center px-0 py-3.5' : 'px-4 py-3',
                  isActive
                    ? 'border-white/15 bg-[linear-gradient(135deg,rgba(116,233,224,0.95),rgba(25,209,195,0.92))] text-slate-950 shadow-[0_20px_30px_-20px_rgba(25,209,195,0.7)]'
                    : 'border-transparent text-white/72 hover:border-white/10 hover:bg-white/10 hover:text-white',
                )
              }
              title={collapsed ? item.label : undefined}
            >
              {collapsed ? item.label.charAt(0) : item.label}
            </NavLink>
          ))}
        </nav>

        <div className={cn('relative mt-auto flex', collapsed ? 'justify-center' : 'justify-start')}>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
