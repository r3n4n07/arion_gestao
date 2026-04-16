type DonutChartProps = {
  allocated: number;
  free: number;
};

export function DonutChart({ allocated, free }: DonutChartProps) {
  const total = allocated + free;
  const allocatedPercent = total === 0 ? 0 : Math.round((allocated / total) * 100);

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
      <div className="relative flex items-center justify-center">
        <div
          className="relative h-52 w-52 rounded-full"
          style={{
            background: `conic-gradient(rgba(16,201,160,0.7) 0% ${allocatedPercent}%, rgba(16,201,160,0.14) ${allocatedPercent}% 100%)`,
          }}
        >
          <div className="absolute inset-7 rounded-full bg-[#f3fcf8]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold text-slate-800">{total}</span>
            <span className="text-sm text-slate-500">IPs totais</span>
          </div>
        </div>
      </div>

      <div className="grid w-full gap-3">
        <div className="rounded-[1.5rem] border border-orange-300 bg-white px-4 py-4 shadow-[0_16px_28px_-24px_rgba(74,79,87,0.16)]">
          <p className="text-sm text-slate-500">Alocados</p>
          <p className="text-2xl font-semibold text-slate-800">{allocated}</p>
        </div>
        <div className="rounded-[1.5rem] border border-orange-300 bg-[#f3fcf8] px-4 py-4 shadow-[0_16px_28px_-24px_rgba(74,79,87,0.12)]">
          <p className="text-sm text-slate-500">Livres</p>
          <p className="text-2xl font-semibold text-slate-800">{free}</p>
        </div>
        <div className="rounded-[1.5rem] border border-orange-300 bg-white px-4 py-4 shadow-[0_16px_28px_-24px_rgba(74,79,87,0.16)]">
          <p className="text-sm text-slate-500">Uso atual</p>
          <p className="text-2xl font-semibold text-slate-800">{allocatedPercent}%</p>
        </div>
      </div>
    </div>
  );
}
