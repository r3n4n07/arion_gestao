import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Field, Input } from '../components/ui/field';
import { Modal } from '../components/ui/modal';
import { Table, TableElement, TBody, TD, TH, THead } from '../components/ui/table';
import { clients } from '../data/mock-data';

export function ClientsPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchedTerm, setSearchedTerm] = useState('');
  const [selectedClientName, setSelectedClientName] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!searchedTerm.trim()) {
      return [];
    }

    const term = searchedTerm.toLowerCase();
    return clients.filter(
      (client) =>
        client.corporateName.toLowerCase().includes(term) ||
        client.tradeName.toLowerCase().includes(term) ||
        client.accessCode.toLowerCase().includes(term),
    );
  }, [searchedTerm]);

  return (
    <>
      <Card title="Pesquisar clientes" description="A consulta é executada apenas após acionar a busca.">
        <div className="flex flex-col gap-4 md:flex-row">
          <Field label="Digite razão social, nome fantasia ou código de acesso">
            <Input
              placeholder="Ex.: Arion, Vitória ou AR-BSB-1001"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </Field>
          <div className="flex items-end gap-3">
            <Button onClick={() => setSearchedTerm(searchInput)}>Pesquisar</Button>
            <Button variant="secondary" onClick={() => {
              setSearchInput('');
              setSearchedTerm('');
            }}>
              Limpar
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        {!searchedTerm ? (
          <Card description="Nenhum cliente é exibido inicialmente. Use a busca para carregar resultados.">
            <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Faça uma pesquisa para listar clientes.
            </div>
          </Card>
        ) : (
          <Card
            title="Resultado da busca"
            description={`${results.length} cliente(s) encontrado(s) para "${searchedTerm}".`}
          >
            <Table>
              <TableElement>
                <THead>
                  <tr>
                    <TH>Cliente</TH>
                    <TH>Contato</TH>
                    <TH>Link</TH>
                    <TH>Status</TH>
                    <TH>Ações</TH>
                  </tr>
                </THead>
                <TBody>
                  {results.map((client) => (
                    <tr key={client.id}>
                      <TD>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{client.tradeName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{client.corporateName}</p>
                        </div>
                      </TD>
                      <TD>
                        <div>
                          <p>{client.contact}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{client.email}</p>
                        </div>
                      </TD>
                      <TD>{client.linkType}</TD>
                      <TD>{client.status}</TD>
                      <TD>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => navigate(`/clientes/${client.id}`)}>
                            Editar
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setSelectedClientName(client.tradeName)}>
                            Desativar
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => setSelectedClientName(client.tradeName)}>
                            Excluir
                          </Button>
                        </div>
                      </TD>
                    </tr>
                  ))}
                </TBody>
              </TableElement>
            </Table>
          </Card>
        )}
      </div>

      <Modal
        title="Ação simulada"
        description="Os dados estão mockados neste template."
        open={Boolean(selectedClientName)}
        onClose={() => setSelectedClientName(null)}
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          A ação para <strong>{selectedClientName}</strong> pode ser conectada ao backend futuramente.
        </p>
      </Modal>
    </>
  );
}
