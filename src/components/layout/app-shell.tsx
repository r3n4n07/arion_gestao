import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Sidebar } from './sidebar';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
      />
      <div className={cn('relative min-h-screen transition-all duration-300', sidebarCollapsed ? 'md:pl-[5.5rem]' : 'md:pl-72')}>
        <button
          type="button"
          aria-label="Abrir menu"
          className="fixed left-4 top-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/65 text-slate-700 shadow-soft backdrop-blur-xl transition hover:bg-white/85 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          =
        </button>
        <main className="relative px-4 pb-6 pt-20 md:px-8 md:pb-8 md:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
