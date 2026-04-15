import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { collaborators, scheduleDays } from '../data/mock-data';
import { cn, formatDate } from '../lib/utils';

const statusTone: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  Trabalhando: 'success',
  Folga: 'neutral',
  'Banco de horas': 'warning',
  Sobreaviso: 'info',
  Atestado: 'danger',
  Férias: 'warning',
};

export function SchedulePage() {
  return (
    <div className="space-y-6">
      <Card title="Calendário operacional" description="Cobertura semanal por colaborador e status.">
        <div className="overflow-x-auto">
          <div className="grid min-w-[720px] grid-cols-8 gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Colaborador
            </div>
            {scheduleDays.map((day) => (
              <div
                key={day.date}
                className="rounded-2xl bg-slate-100 p-3 text-center text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {formatDate(day.date)}
              </div>
            ))}

            {collaborators.map((collaborator) => (
              <>
                <div
                  key={`${collaborator.id}-name`}
                  className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{collaborator.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{collaborator.role}</p>
                </div>
                {scheduleDays.map((day) => {
                  const assignment = day.assignments.find((item) => item.collaboratorId === collaborator.id);
                  return (
                    <div
                      key={`${collaborator.id}-${day.date}`}
                      className={cn(
                        'rounded-2xl border border-slate-200 p-3 text-center dark:border-slate-800',
                        assignment?.status === 'Trabalhando' && 'bg-emerald-50 dark:bg-emerald-500/10',
                        assignment?.status === 'Folga' && 'bg-slate-50 dark:bg-slate-900',
                        assignment?.status === 'Sobreaviso' && 'bg-cyan-50 dark:bg-cyan-500/10',
                        assignment?.status === 'Banco de horas' && 'bg-amber-50 dark:bg-amber-500/10',
                        assignment?.status === 'Férias' && 'bg-orange-50 dark:bg-orange-500/10',
                        assignment?.status === 'Atestado' && 'bg-rose-50 dark:bg-rose-500/10',
                      )}
                    >
                      <Badge variant={statusTone[assignment?.status ?? 'Folga']}>
                        {assignment?.status ?? 'Folga'}
                      </Badge>
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Lista de funcionários" description="Agrupamento rápido por supervisor, região e função.">
        <div className="grid gap-4 lg:grid-cols-2">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{collaborator.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{collaborator.role}</p>
                </div>
                <Badge variant={statusTone[collaborator.status]}>{collaborator.status}</Badge>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                <p>Supervisor: {collaborator.supervisor}</p>
                <p>Região: {collaborator.region}</p>
                <p>Turno: {collaborator.shiftStart} às {collaborator.shiftEnd}</p>
                <p>Telefone: {collaborator.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
