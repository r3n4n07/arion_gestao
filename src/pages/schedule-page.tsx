import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  collaborators,
  scheduleDays,
  scheduleRegions,
  scheduleStatuses,
} from "../data/mock-data";
import { cn, formatDate } from "../lib/utils";
import type { CollaboratorRegion, ScheduleStatus } from "../types";

const statusTone: Record<
  ScheduleStatus,
  "success" | "warning" | "danger" | "info"
> = {
  Trabalhando: "success",
  Folga: "info",
  Férias: "warning",
  Afastado: "danger",
};

function getCollaboratorStatusForDate(collaboratorId: string, date: string) {
  const day = scheduleDays.find((item) => item.date === date);
  return (
    day?.assignments.find(
      (assignment) => assignment.collaboratorId === collaboratorId,
    )?.status ?? "Folga"
  );
}

export function SchedulePage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(scheduleDays[0]?.date ?? "");
  const [selectedStatus, setSelectedStatus] = useState<
    "Todos" | ScheduleStatus
  >("Todos");
  const [selectedRegion, setSelectedRegion] = useState<
    "Todas" | CollaboratorRegion
  >("Todas");

  const groupedCollaborators = useMemo(() => {
    const filtered = collaborators
      .map((collaborator) => ({
        ...collaborator,
        currentStatus: getCollaboratorStatusForDate(
          collaborator.id,
          selectedDate,
        ),
      }))
      .filter((collaborator) =>
        selectedStatus === "Todos"
          ? true
          : collaborator.currentStatus === selectedStatus,
      )
      .filter((collaborator) =>
        selectedRegion === "Todas"
          ? true
          : collaborator.region === selectedRegion,
      );

    return filtered.reduce<Record<string, typeof filtered>>(
      (accumulator, collaborator) => {
        const key = collaborator.supervisor;
        if (!accumulator[key]) {
          accumulator[key] = [];
        }
        accumulator[key].push(collaborator);
        return accumulator;
      },
      {},
    );
  }, [selectedDate, selectedRegion, selectedStatus]);

  const groupedEntries = Object.entries(groupedCollaborators);

  return (
    <div className="space-y-6">
      <div className="sticky top-4 z-10">
        <Card className="border-orange-300 bg-white shadow-[0_24px_48px_-30px_rgba(74,79,87,0.28)]">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Data
                </span>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="h-12 rounded-2xl border border-orange-300 bg-white px-4 text-sm text-slate-700 shadow-[0_14px_28px_-22px_rgba(74,79,87,0.18)] outline-none transition focus:border-aqua-500"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Status de trabalho
                </span>
                <select
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(
                      event.target.value as "Todos" | ScheduleStatus,
                    )
                  }
                  className="h-12 rounded-2xl border border-orange-300 bg-white px-4 text-sm text-slate-700 shadow-[0_14px_28px_-22px_rgba(74,79,87,0.18)] outline-none transition focus:border-aqua-500"
                >
                  <option value="Todos">Todos</option>
                  {scheduleStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Região
                </span>
                <select
                  value={selectedRegion}
                  onChange={(event) =>
                    setSelectedRegion(
                      event.target.value as "Todas" | CollaboratorRegion,
                    )
                  }
                  className="h-12 rounded-2xl border border-orange-300 bg-white px-4 text-sm text-slate-700 shadow-[0_14px_28px_-22px_rgba(74,79,87,0.18)] outline-none transition focus:border-aqua-500"
                >
                  <option value="Todas">Todas</option>
                  {scheduleRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-orange-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_14px_28px_-22px_rgba(74,79,87,0.18)]">
                Visualizando {formatDate(selectedDate)}
              </div>
              <Button onClick={() => navigate("/escala/editar")}>
                Editar escala
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-5">
        {groupedEntries.length === 0 ? (
          <Card
            title="Nenhum colaborador encontrado"
            description="Ajuste os filtros para visualizar a escala desejada."
          >
            <div className="rounded-[1.5rem] border border-dashed border-orange-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
              Nenhum colaborador corresponde aos filtros selecionados.
            </div>
          </Card>
        ) : (
          groupedEntries.map(([supervisor, items]) => (
            <Card
              key={supervisor}
              title={supervisor}
              description={`${items.length} colaborador(es) para ${formatDate(selectedDate)}.`}
              className="!border-orange-300 border-b-[6px] bg-white shadow-[0_24px_48px_-30px_rgba(74,79,87,0.26)]"
            >
              <div className="overflow-x-auto">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr] gap-3 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-[0_14px_28px_-24px_rgba(74,79,87,0.18)]">
                    <span>Nome</span>
                    <span>Status</span>
                    <span>Turno</span>
                  </div>
                  <div className="mt-3 space-y-0">
                    {items.map((collaborator, index) => (
                      <div key={collaborator.id}>
                        <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr] gap-3 rounded-[0] bg-white px-4 py-4 text-sm text-slate-600 shadow-[0_16px_30px_-24px_rgba(74,79,87,0.18)]">
                          <div>
                            <p className="font-semibold text-slate-800">
                              {collaborator.name}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                              {collaborator.role} • {collaborator.region}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Badge
                              variant={statusTone[collaborator.currentStatus]}
                            >
                              {collaborator.currentStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={cn(
                                "rounded-full px-3 py-1 text-sm font-medium",
                                collaborator.shiftStart === "--"
                                  ? "bg-slate-100 text-slate-500"
                                  : "bg-aqua-500/12 text-aqua-700",
                              )}
                            >
                              {collaborator.shiftStart === "--"
                                ? "--"
                                : `${collaborator.shiftStart} - ${collaborator.shiftEnd}`}
                            </span>
                          </div>
                        </div>

                        {/* Separador entre linhas, exceto após o último item */}
                        {index < items.length - 1 && (
                          <div className="mx-4 h-px bg-[#10c9a0b3]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
