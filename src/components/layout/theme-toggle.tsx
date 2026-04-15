import { cn } from '../../lib/utils';
import { useTheme } from '../../hooks/use-theme';

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-4 w-4 transition-colors', active ? 'text-slate-950' : 'text-white/65')}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-4 w-4 transition-colors', active ? 'text-slate-950' : 'text-white/65')}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="group relative flex h-11 w-full max-w-[10.5rem] items-center rounded-full border border-white/15 bg-white/8 px-2 backdrop-blur-xl transition hover:bg-white/12"
    >
      <div
        className={cn(
          'absolute top-1 h-9 w-[calc(50%-0.25rem)] rounded-full bg-[linear-gradient(135deg,#f2f4f7,#b9c2ca)] shadow-[0_14px_28px_-18px_rgba(185,194,202,0.95)] transition-transform duration-300 ease-out',
          isDark ? 'translate-x-full bg-[linear-gradient(135deg,#7cf0e7,#12bfb1)]' : 'translate-x-0',
        )}
      />
      <span className="relative z-10 flex flex-1 items-center justify-center gap-1.5 text-xs font-medium">
        <SunIcon active={!isDark} />
        <span className={cn('transition-colors', !isDark ? 'text-slate-950' : 'text-white/70')}>
          Light
        </span>
      </span>
      <span className="relative z-10 flex flex-1 items-center justify-center gap-1.5 text-xs font-medium">
        <MoonIcon active={isDark} />
        <span className={cn('transition-colors', isDark ? 'text-slate-950' : 'text-white/70')}>
          Dark
        </span>
      </span>
    </button>
  );
}
