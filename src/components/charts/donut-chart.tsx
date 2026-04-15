type DonutChartProps = {
  allocated: number;
  free: number;
};

export function DonutChart({ allocated, free }: DonutChartProps) {
  const total = allocated + free;
  const allocatedPercent = total === 0 ? 0 : Math.round((allocated / total) * 100);

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
      <div
        className="relative h-52 w-52 rounded-full p-2"
        style={{
          background: `conic-gradient(rgba(16,201,160,0.28) 0% 8%, #10C9A0 8% ${allocatedPercent}%, rgba(255,255,255,0.2) ${allocatedPercent}% 100%)`,
        }}
      >
        <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full border border-white/20 bg-white/12 backdrop-blur-xl">
          <span className="text-4xl font-semibold text-white">{total}</span>
          <span className="text-sm text-white/70">IPs totais</span>
        </div>
      </div>
      <div className="grid w-full gap-3">
        <div className="rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-xl">
          <p className="text-sm text-white/70">Alocados</p>
          <p className="text-2xl font-semibold text-white">{allocated}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-xl">
          <p className="text-sm text-white/70">Livres</p>
          <p className="text-2xl font-semibold text-white">{free}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-xl">
          <p className="text-sm text-white/70">Uso atual</p>
          <p className="text-2xl font-semibold text-white">{allocatedPercent}%</p>
        </div>
      </div>
    </div>
  );
}
