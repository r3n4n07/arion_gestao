import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Field, Input, Select, Textarea } from '../components/ui/field';
import { clientHistoryById, clients, locationOptions } from '../data/mock-data';
import { formatDate } from '../lib/utils';

export function ClientDetailPage() {
  const { id } = useParams();
  const client = useMemo(() => clients.find((item) => item.id === id) ?? clients[0], [id]);
  const [formData, setFormData] = useState(client);

  const history = clientHistoryById[client.id] ?? [];

  function updateField<K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="space-y-6">
      <Card title={`Cliente: ${client.tradeName}`} description="Edição de dados cadastrais e técnicos do contrato.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Dados do cliente
            </h3>
            <Field label="Razão social">
              <Input value={formData.corporateName} onChange={(e) => updateField('corporateName', e.target.value)} />
            </Field>
            <Field label="Nome fantasia">
              <Input value={formData.tradeName} onChange={(e) => updateField('tradeName', e.target.value)} />
            </Field>
            <Field label="Contratante">
              <Input value={formData.contractor} onChange={(e) => updateField('contractor', e.target.value)} />
            </Field>
            <Field label="Contato">
              <Input value={formData.contact} onChange={(e) => updateField('contact', e.target.value)} />
            </Field>
            <Field label="Email">
              <Input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
            </Field>
            <Field label="Vendedor">
              <Input value={formData.seller} onChange={(e) => updateField('seller', e.target.value)} />
            </Field>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Dados do link
            </h3>
            <Field label="Código de acesso">
              <Input value={formData.accessCode} onChange={(e) => updateField('accessCode', e.target.value)} />
            </Field>
            <Field label="Tipo do link">
              <Select value={formData.linkType} onChange={(e) => updateField('linkType', e.target.value as typeof formData.linkType)}>
                <option>Banda dedicada</option>
                <option>Banda larga</option>
              </Select>
            </Field>
            <Field label="Chamado">
              <Input value={formData.ticketNumber} onChange={(e) => updateField('ticketNumber', e.target.value)} />
            </Field>
            <Field label="Localidade">
              <Select value={formData.location} onChange={(e) => updateField('location', e.target.value)}>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Velocidade">
              <Input value={formData.speed} onChange={(e) => updateField('speed', e.target.value)} />
            </Field>
            <Field label="Local de instalação">
              <Input value={formData.installationSite} onChange={(e) => updateField('installationSite', e.target.value)} />
            </Field>
            <Field label="Observações">
              <Textarea value={formData.notes} onChange={(e) => updateField('notes', e.target.value)} />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Salvar alterações</Button>
        </div>
      </Card>

      <Card title="Histórico de alterações" description="Seção opcional para rastreabilidade das edições do cliente.">
        <div className="space-y-3">
          {history.map((entry) => (
            <div
              key={`${entry.ticketNumber}-${entry.date}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.ticketNumber}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{entry.description}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{formatDate(entry.date)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
