import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Table, TableElement, TBody, TD, TH, THead } from '../components/ui/table';
import { equipmentRecords } from '../data/mock-data';

export function EquipmentPage() {
  return (
    <Card title="Gestão de equipamentos" description="Inventário técnico com localização, serial e condição operacional.">
      <Table>
        <TableElement>
          <THead>
            <tr>
              <TH>Equipamento</TH>
              <TH>Tipo</TH>
              <TH>Serial</TH>
              <TH>Localidade</TH>
              <TH>Status</TH>
            </tr>
          </THead>
          <TBody>
            {equipmentRecords.map((equipment) => (
              <tr key={equipment.id}>
                <TD>{equipment.name}</TD>
                <TD>{equipment.type}</TD>
                <TD>{equipment.serialNumber}</TD>
                <TD>{equipment.location}</TD>
                <TD>
                  <Badge
                    variant={
                      equipment.status === 'Operacional'
                        ? 'success'
                        : equipment.status === 'Reserva'
                          ? 'info'
                          : 'warning'
                    }
                  >
                    {equipment.status}
                  </Badge>
                </TD>
              </tr>
            ))}
          </TBody>
        </TableElement>
      </Table>
    </Card>
  );
}
