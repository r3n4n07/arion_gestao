import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Table, TableElement, TBody, TD, TH, THead } from '../components/ui/table';
import { ipRecords } from '../data/mock-data';

export function IpsPage() {
  return (
    <Card title="Gestão de IPs" description="Controle de alocação, gateway e atualização dos blocos.">
      <Table>
        <TableElement>
          <THead>
            <tr>
              <TH>IP</TH>
              <TH>Cliente</TH>
              <TH>Gateway</TH>
              <TH>Status</TH>
              <TH>Atualizado em</TH>
            </tr>
          </THead>
          <TBody>
            {ipRecords.map((record) => (
              <tr key={record.id}>
                <TD>{record.address}</TD>
                <TD>{record.client}</TD>
                <TD>{record.gateway}</TD>
                <TD>
                  <Badge variant={record.status === 'Livre' ? 'warning' : 'success'}>{record.status}</Badge>
                </TD>
                <TD>{record.updatedAt}</TD>
              </tr>
            ))}
          </TBody>
        </TableElement>
      </Table>
    </Card>
  );
}
