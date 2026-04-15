import { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Field, Select } from '../components/ui/field';
import { collaborators, scheduleDays, scheduleStatuses } from '../data/mock-data';

export function ScheduleEditPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(scheduleDays[0]?.date ?? '');
  const [selectedStatus, setSelectedStatus] = useState(scheduleStatuses[0]);

  const selectedNames = useMemo(
    () => collaborators.filter((item) => selectedIds.includes(item.id)).map((item) => item.name),
    [selectedIds],
  );

  function toggleCollaborator(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div className="space-y-6">
      <Card title="Aplicação em lote" description="Selecione colaboradores e aplique o status no dia desejado.">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              Seleção múltipla de funcionários
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {collaborators.map((collaborator) => (
                <label
                  key={collaborator.id}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-aqua-500 focus:ring-aqua-500"
                    checked={selectedIds.includes(collaborator.id)}
                    onChange={() => toggleCollaborator(collaborator.id)}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {collaborator.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{collaborator.region}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Field label="Dia do calendário">
              <Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {scheduleDays.map((day) => (
                  <option key={day.date} value={day.date}>
                    {new Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).format(new Date(day.date))}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Status a aplicar">
              <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}>
                {scheduleStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Field>
            <Button className="w-full">Salvar e aplicar para todos</Button>
          </div>
        </div>
      </Card>

      <Card title="Resumo da operação" description="Pré-visualização simples da atualização em lote.">
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Colaboradores selecionados: {selectedNames.length > 0 ? selectedNames.join(', ') : 'nenhum'}
          </p>
          <p>Data escolhida: {selectedDate || 'não selecionada'}</p>
          <p>Status definido: {selectedStatus}</p>
        </div>
      </Card>
    </div>
  );
}
