import { useRef } from "react";
import { BarChart } from "../components/charts/bar-chart";
import { DonutChart } from "../components/charts/donut-chart";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  dashboardMonthlyClients,
  ipPoolSummary,
  systemLogs,
} from "../data/mock-data";

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/60 text-slate-700 shadow-[0_18px_32px_-24px_rgba(74,79,87,0.45)] backdrop-blur-xl transition hover:bg-white/85"
    >
      {direction === "left" ? "<" : ">"}
    </button>
  );
}

export function DashboardPage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(direction: "left" | "right") {
    carouselRef.current?.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Dashboards principais
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Carrossel de indicadores
            </h2>
          </div>
          <div className="flex gap-3">
            <ArrowButton
              direction="left"
              onClick={() => scrollCarousel("left")}
            />
            <ArrowButton
              direction="right"
              onClick={() => scrollCarousel("right")}
            />
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none]"
        >
          <Card className="min-h-[28rem] min-w-[min(100%,28rem)] snap-start border-white/25 bg-slate-700/78 text-white shadow-[0_32px_60px_-36px_rgba(74,79,87,0.7)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                  Clientes
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">
                  Inclusões por mês
                </h3>
              </div>
              <Badge variant="neutral">12 meses</Badge>
            </div>
            <BarChart data={dashboardMonthlyClients} />
          </Card>

          <Card className="min-h-[28rem] min-w-[min(100%,26rem)] snap-start border-white/25 bg-slate-700/78 text-white shadow-[0_32px_60px_-36px_rgba(74,79,87,0.7)]">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                Endereçamento
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-white">
                Distribuição de IPs
              </h3>
            </div>
            <DonutChart
              allocated={ipPoolSummary.allocated}
              free={ipPoolSummary.free}
            />
          </Card>

          <Card className="min-h-[28rem] min-w-[min(100%,24rem)] snap-start border-white/25 bg-slate-700/78 text-white shadow-[0_32px_60px_-36px_rgba(74,79,87,0.7)]">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                  Saúde da operação
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">
                  Pulso executivo
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/78">
                  Resumo rápido para tomada de decisão, com leitura pensada para
                  ambientes de operação e gestão.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                  <p className="text-sm text-white/65">Tickets em andamento</p>
                  <p className="mt-2 text-4xl font-semibold text-white">23</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                  <p className="text-sm text-white/65">Equipes de plantão</p>
                  <p className="mt-2 text-4xl font-semibold text-white">07</p>
                </div>
                <Button
                  variant="secondary"
                  className="border-white/20 bg-white/12 text-white hover:bg-white/20"
                >
                  Ver operação completa
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <Card
          title="Stream de logs"
          description="Área separada do carrossel para futura integração com Graylog."
          className="border-white/65 bg-white/48 shadow-[0_30px_60px_-40px_rgba(74,79,87,0.32)]"
        >
          <div className="flex gap-4 overflow-x-auto pb-2">
            {systemLogs.map((log, index) => (
              <div
                key={log}
                className="min-w-[22rem] rounded-[1.5rem] border border-white/60 bg-white/62 p-4 shadow-[0_18px_36px_-28px_rgba(74,79,87,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/78"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Badge variant="info">Graylog</Badge>
                <p className="mt-3 text-sm leading-7 text-slate-700">{log}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
