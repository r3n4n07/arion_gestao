type BarChartProps = {
  data: Array<{ month: string; value: number }>;
};

export function BarChart({ data }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[880px] gap-5 px-1">
        {data.map((item, index) => (
          <div
            key={item.month}
            className="flex w-[3.35rem] flex-none flex-col items-center gap-3"
          >
            <div className="relative flex h-72 w-full items-end overflow-hidden rounded-[1.6rem] bg-black/20 px-[3px] pb-[3px]">
              <div
                className="relative z-10 w-full rounded-[1.35rem] bg-aqua-500 shadow-[0_20px_35px_-22px_rgba(16,201,160,0.95)] animate-bar-rise"
                style={{
                  height: `${(item.value / max) * 100}%`,
                  animationDelay: `${index * 70}ms`,
                  opacity: 0.35 + ((index + 1) / data.length) * 0.65,
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">
                {item.value}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-white/78">
                {item.month}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
