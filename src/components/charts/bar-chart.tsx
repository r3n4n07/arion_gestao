type BarChartProps = {
  data: Array<{ month: string; value: number }>;
};

export function BarChart({ data }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[880px] gap-4">
        {data.map((item, index) => (
          <div key={item.month} className="flex w-14 flex-none flex-col items-center gap-3">
            <div className="relative flex h-72 w-full items-end overflow-hidden rounded-[1.5rem] bg-white/10 px-1 pb-1 dark:bg-white/5">
              <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.14),transparent)]" />
              <div
                className="relative z-10 w-full rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(255,247,237,0.96),rgba(251,146,60,0.85)_28%,rgba(244,63,94,0.92)_78%)] shadow-[0_18px_28px_-20px_rgba(249,115,22,0.95)] animate-bar-rise"
                style={{
                  height: `${(item.value / max) * 100}%`,
                  animationDelay: `${index * 70}ms`,
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">{item.month}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
