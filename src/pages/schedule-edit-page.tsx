import { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input, Select } from '../components/ui/field';
import { collaborators, scheduleDays, scheduleStatuses } from '../data/mock-data';
import type { ScheduleStatus } from '../types';

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
}

function getMonthDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells: Array<{ date: Date | null; key: string }> = [];

  for (let index = 0; index < startOffset; index += 1) {
    cells.push({ date: null, key: `empty-start-${index}` });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ date, key: date.toISOString() });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ date: null, key: `empty-end-${cells.length}` });
  }

  return cells;
}

function dateToKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getStatusForEmployee(employeeId: string, dateKey: string) {
  const day = scheduleDays.find((item) => item.date === dateKey);
  return day?.assignments.find((assignment) => assignment.collaboratorId === employeeId)?.status ?? null;
}

export function ScheduleEditPage() {
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [employeeListOpen, setEmployeeListOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date(scheduleDays[0]?.date ?? '2026-04-01'));
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [workStatus, setWorkStatus] = useState<ScheduleStatus>(scheduleStatuses[0]);
  const [shiftStart, setShiftStart] = useState('08:00');
  const [shiftEnd, setShiftEnd] = useState('18:00');

  const supervisors = useMemo(
    () => Array.from(new Set(collaborators.map((collaborator) => collaborator.supervisor))),
    [],
  );

  const employeesBySupervisor = useMemo(
    () =>
      collaborators.filter((collaborator) => {
        if (!selectedSupervisor) {
          return false;
        }

        const matchesSupervisor = collaborator.supervisor === selectedSupervisor;
        const matchesQuery = collaborator.name.toLowerCase().includes(employeeSearch.toLowerCase());
        return matchesSupervisor && matchesQuery;
      }),
    [employeeSearch, selectedSupervisor],
  );

  const selectedEmployee = useMemo(
    () => collaborators.find((collaborator) => collaborator.id === selectedEmployeeId) ?? null,
    [selectedEmployeeId],
  );

  const calendarCells = useMemo(() => getMonthDays(viewDate), [viewDate]);

  function handleSelectEmployee(employeeId: string) {
    setSelectedEmployeeId(employeeId);
    setEmployeeListOpen(false);
    setEmployeeSearch('');
    setSelectedDates([]);
  }

  function toggleDay(dateKey: string) {
    setSelectedDates((current) =>
      current.includes(dateKey) ? current.filter((item) => item !== dateKey) : [...current, dateKey],
    );
  }

  function changeMonth(step: number) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));
  }

  const canEditCalendar = Boolean(selectedSupervisor && selectedEmployee);

  return (
    <div className="space-y-6">
      <Card
        title="Configuração da edição"
        description="Selecione o supervisor e o colaborador para liberar o calendário de escala."
        className="shadow-[0_22px_40px_-30px_rgba(74,79,87,0.24)]"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="grid flex-1 gap-4 md:grid-cols-[0.9fr_1.1fr]">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Supervisor</span>
              <Select
                value={selectedSupervisor}
                onChange={(event) => {
                  setSelectedSupervisor(event.target.value);
                  setSelectedEmployeeId('');
                  setEmployeeSearch('');
                  setEmployeeListOpen(false);
                  setSelectedDates([]);
                }}
              >
                <option value="">Selecione um supervisor</option>
                {supervisors.map((supervisor) => (
                  <option key={supervisor} value={supervisor}>
                    {supervisor}
                  </option>
                ))}
              </Select>
            </label>

            <div className="relative flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Funcionário</span>
              <button
                type="button"
                disabled={!selectedSupervisor}
                onClick={() => setEmployeeListOpen((current) => !current)}
                className="flex h-11 items-center justify-between rounded-2xl border border-orange-300 bg-white px-4 text-sm text-slate-700 transition hover:border-aqua-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{selectedEmployee?.name ?? 'Selecione um funcionário'}</span>
                <span>v</span>
              </button>

              {employeeListOpen && selectedSupervisor && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-[1.5rem] border border-orange-300 bg-white p-3 shadow-[0_20px_36px_-28px_rgba(74,79,87,0.24)]">
                  <Input
                    placeholder="Pesquisar funcionário"
                    value={employeeSearch}
                    onChange={(event) => setEmployeeSearch(event.target.value)}
                  />
                  <div className="mt-3 max-h-56 overflow-y-auto">
                    {employeesBySupervisor.length === 0 ? (
                      <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                        Nenhum funcionário encontrado.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {employeesBySupervisor.map((employee) => (
                          <button
                            key={employee.id}
                            type="button"
                            onClick={() => handleSelectEmployee(employee.id)}
                            className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-orange-300 hover:bg-white"
                          >
                            <span>{employee.name}</span>
                            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{employee.region}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-orange-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-[0_14px_24px_-22px_rgba(74,79,87,0.16)]">
            {selectedEmployee ? `Editando escala de ${selectedEmployee.name}` : 'Selecione supervisor e funcionário'}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card
          title="Calendário mensal"
          description="Clique nos dias do mês para marcar os dias que serão atualizados."
          className="shadow-[0_22px_40px_-30px_rgba(74,79,87,0.22)]"
        >
          {canEditCalendar ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={() => changeMonth(-1)}>
                  Mês anterior
                </Button>
                <h3 className="text-xl font-semibold capitalize text-slate-800">{formatMonthLabel(viewDate)}</h3>
                <Button variant="secondary" onClick={() => changeMonth(1)}>
                  Próximo mês
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-3">
                {calendarCells.map((cell) => {
                  if (!cell.date) {
                    return <div key={cell.key} className="h-24 rounded-2xl bg-transparent" />;
                  }

                  const dateKey = dateToKey(cell.date);
                  const status = selectedEmployee ? getStatusForEmployee(selectedEmployee.id, dateKey) : null;
                  const isSelected = selectedDates.includes(dateKey);

                  return (
                    <button
                      key={cell.key}
                      type="button"
                      onClick={() => toggleDay(dateKey)}
                      className={`
                        flex h-24 flex-col items-start justify-between rounded-2xl border px-3 py-3 text-left transition
                        ${isSelected ? 'border-aqua-500 bg-[rgba(16,201,160,0.7)] text-white' : 'border-orange-300 bg-white text-slate-700 hover:border-aqua-500'}
                      `}
                    >
                      <span className="text-sm font-semibold">{cell.date.getDate()}</span>
                      <span
                        className={`
                          rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]
                          ${isSelected ? 'bg-white/20 text-white' : status ? 'bg-slate-100 text-slate-500' : 'bg-slate-50 text-slate-300'}
                        `}
                      >
                        {status ?? 'Livre'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-orange-300 bg-slate-50 px-6 py-16 text-center text-sm text-slate-500">
              Selecione um supervisor e um funcionário para liberar o calendário.
            </div>
          )}
        </Card>

        <Card
          title="Definição da escala"
          description="Informe o status e o horário que serão aplicados aos dias selecionados."
          className="shadow-[0_22px_40px_-30px_rgba(74,79,87,0.22)]"
        >
          <div className="space-y-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-600">Estado de trabalho</span>
              <Select
                value={workStatus}
                onChange={(event) => setWorkStatus(event.target.value as ScheduleStatus)}
                disabled={!canEditCalendar}
              >
                {scheduleStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-600">Hora inicial</span>
                <Input
                  type="time"
                  value={shiftStart}
                  onChange={(event) => setShiftStart(event.target.value)}
                  disabled={!canEditCalendar}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-600">Hora final</span>
                <Input
                  type="time"
                  value={shiftEnd}
                  onChange={(event) => setShiftEnd(event.target.value)}
                  disabled={!canEditCalendar}
                />
              </label>
            </div>

            <div className="rounded-[1.5rem] border border-orange-300 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <p>Dias selecionados: {selectedDates.length > 0 ? selectedDates.join(', ') : 'nenhum dia selecionado'}</p>
              <p className="mt-2">Status a aplicar: {workStatus}</p>
              <p className="mt-2">Turno: {shiftStart} - {shiftEnd}</p>
            </div>

            <Button className="w-full" disabled={!canEditCalendar || selectedDates.length === 0}>
              Aplicar escala nos dias selecionados
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
