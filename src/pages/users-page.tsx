import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Table, TableElement, TBody, TD, TH, THead } from '../components/ui/table';
import { userRecords } from '../data/mock-data';

export function UsersPage() {
  return (
    <Card title="Gestão de usuários" description="Perfis de acesso, status de conta e último acesso.">
      <Table>
        <TableElement>
          <THead>
            <tr>
              <TH>Usuário</TH>
              <TH>Email</TH>
              <TH>Perfil</TH>
              <TH>Status</TH>
              <TH>Último acesso</TH>
            </tr>
          </THead>
          <TBody>
            {userRecords.map((record) => (
              <tr key={record.id}>
                <TD>{record.name}</TD>
                <TD>{record.email}</TD>
                <TD>{record.profile}</TD>
                <TD>
                  <Badge variant={record.status === 'Ativo' ? 'success' : 'danger'}>{record.status}</Badge>
                </TD>
                <TD>{record.lastAccess}</TD>
              </tr>
            ))}
          </TBody>
        </TableElement>
      </Table>
    </Card>
  );
}
