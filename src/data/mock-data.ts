import type {
  Client,
  ClientHistoryEntry,
  Collaborator,
  EquipmentRecord,
  IpRecord,
  ScheduleDay,
  ScheduleStatus,
  UserRecord,
} from '../types';

export const dashboardMonthlyClients = [
  { month: 'Jan', value: 12 },
  { month: 'Fev', value: 18 },
  { month: 'Mar', value: 24 },
  { month: 'Abr', value: 21 },
  { month: 'Mai', value: 30 },
  { month: 'Jun', value: 27 },
  { month: 'Jul', value: 33 },
  { month: 'Ago', value: 36 },
  { month: 'Set', value: 41 },
  { month: 'Out', value: 38 },
  { month: 'Nov', value: 44 },
  { month: 'Dez', value: 49 },
];

export const ipPoolSummary = {
  allocated: 128,
  free: 64,
};

export const systemLogs = [
  '09:12:42 INFO Graylog stream: autenticação concluída para cliente GLO-203.',
  '09:18:07 WARN Gateway 10.11.0.1 com latência acima do esperado em Brasília.',
  '09:21:33 INFO Rotina de sincronização de escala executada com sucesso.',
  '09:25:51 ERROR Falha intermitente na coleta SNMP do switch SW-GRU-19.',
];

export const clients: Client[] = [
  {
    id: '1',
    corporateName: 'Arion Telecomunicações S.A.',
    tradeName: 'Arion Brasília',
    contractor: 'Mariana Costa',
    contact: '(61) 99999-2020',
    email: 'mariana.costa@arion.com',
    seller: 'João Ramos',
    accessCode: 'AR-BSB-1001',
    linkType: 'Banda dedicada',
    ticketNumber: 'CH-48291',
    location: 'brasilia',
    speed: '500 Mbps',
    installationSite: 'Data Center Bloco A',
    notes: 'Cliente prioritário com janela de manutenção noturna.',
    status: 'Ativo',
    updatedAt: '2026-04-10',
  },
  {
    id: '2',
    corporateName: 'Operações Aeroportuárias Sul Ltda.',
    tradeName: 'Ops Sul',
    contractor: 'Carlos Menezes',
    contact: '(51) 98888-1212',
    email: 'carlos.menezes@opssul.com',
    seller: 'Aline Prado',
    accessCode: 'AR-POA-2230',
    linkType: 'Banda larga',
    ticketNumber: 'CH-48011',
    location: 'porto alegre',
    speed: '200 Mbps',
    installationSite: 'Terminal logístico',
    notes: 'Solicitou revisão de SLA para feriados.',
    status: 'Ativo',
    updatedAt: '2026-04-07',
  },
  {
    id: '3',
    corporateName: 'Infraestrutura Vitória Participações',
    tradeName: 'Infra Vitória',
    contractor: 'Fernanda Lopes',
    contact: '(27) 97777-4545',
    email: 'fernanda.lopes@infravix.com',
    seller: 'Diego Nunes',
    accessCode: 'AR-VIX-7782',
    linkType: 'Banda dedicada',
    ticketNumber: 'CH-47542',
    location: 'vitória',
    speed: '1 Gbps',
    installationSite: 'Prédio administrativo',
    notes: 'Aguardando expansão para novo andar.',
    status: 'Desativado',
    updatedAt: '2026-03-29',
  },
];

export const clientHistoryById: Record<string, ClientHistoryEntry[]> = {
  '1': [
    {
      ticketNumber: 'CH-48291',
      description: 'Upgrade de velocidade de 300 Mbps para 500 Mbps.',
      date: '2026-04-10',
    },
    {
      ticketNumber: 'CH-47010',
      description: 'Atualização de contato técnico principal.',
      date: '2026-03-14',
    },
  ],
  '2': [
    {
      ticketNumber: 'CH-48011',
      description: 'Revisão de rota secundária do link.',
      date: '2026-04-07',
    },
  ],
  '3': [
    {
      ticketNumber: 'CH-47542',
      description: 'Cliente desativado por encerramento contratual.',
      date: '2026-03-29',
    },
  ],
};

export const collaborators: Collaborator[] = [
  {
    id: 'c1',
    name: 'Paulo Henrique',
    supervisor: 'Lívia Cardoso',
    region: 'Sudeste',
    role: 'Técnico de Campo',
    phone: '(11) 98888-0001',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    status: 'Trabalhando',
  },
  {
    id: 'c2',
    name: 'Renata Silva',
    supervisor: 'Lívia Cardoso',
    region: 'Sul',
    role: 'Analista NOC',
    phone: '(51) 97777-1111',
    shiftStart: '09:00',
    shiftEnd: '18:00',
    status: 'Sobreaviso',
  },
  {
    id: 'c3',
    name: 'Eduardo Lima',
    supervisor: 'Marcos Teixeira',
    region: 'Nordeste',
    role: 'Supervisor',
    phone: '(85) 96666-2222',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    status: 'Folga',
  },
  {
    id: 'c4',
    name: 'Bianca Moura',
    supervisor: 'Marcos Teixeira',
    region: 'Centro-Oeste',
    role: 'Técnica de Implantação',
    phone: '(61) 95555-3333',
    shiftStart: '08:30',
    shiftEnd: '17:30',
    status: 'Banco de horas',
  },
];

const weekStatuses: ScheduleStatus[] = [
  'Trabalhando',
  'Trabalhando',
  'Sobreaviso',
  'Folga',
  'Trabalhando',
  'Banco de horas',
  'Férias',
];

export const scheduleDays: ScheduleDay[] = Array.from({ length: 7 }, (_, index) => ({
  date: `2026-04-${String(14 + index).padStart(2, '0')}`,
  assignments: collaborators.map((collaborator, collaboratorIndex) => ({
    collaboratorId: collaborator.id,
    status: weekStatuses[(index + collaboratorIndex) % weekStatuses.length],
  })),
}));

export const ipRecords: IpRecord[] = [
  {
    id: 'ip1',
    address: '10.20.30.10',
    client: 'Arion Brasília',
    status: 'Alocado',
    gateway: '10.20.30.1',
    updatedAt: '2026-04-12',
  },
  {
    id: 'ip2',
    address: '10.20.30.11',
    client: '-',
    status: 'Livre',
    gateway: '10.20.30.1',
    updatedAt: '2026-04-11',
  },
  {
    id: 'ip3',
    address: '10.20.31.14',
    client: 'Ops Sul',
    status: 'Alocado',
    gateway: '10.20.31.1',
    updatedAt: '2026-04-09',
  },
];

export const userRecords: UserRecord[] = [
  {
    id: 'u1',
    name: 'Ana Ribeiro',
    email: 'ana.ribeiro@arion.com',
    profile: 'Administrador',
    status: 'Ativo',
    lastAccess: 'Hoje, 08:42',
  },
  {
    id: 'u2',
    name: 'Gustavo Mota',
    email: 'gustavo.mota@arion.com',
    profile: 'Supervisor',
    status: 'Ativo',
    lastAccess: 'Hoje, 07:55',
  },
  {
    id: 'u3',
    name: 'Camila Duarte',
    email: 'camila.duarte@arion.com',
    profile: 'Analista',
    status: 'Inativo',
    lastAccess: '11/04/2026',
  },
];

export const equipmentRecords: EquipmentRecord[] = [
  {
    id: 'e1',
    name: 'Cisco ISR 4331',
    type: 'Roteador',
    serialNumber: 'ISR4331-88920',
    location: 'Guarulhos',
    status: 'Operacional',
  },
  {
    id: 'e2',
    name: 'Mikrotik CCR2004',
    type: 'Borda',
    serialNumber: 'CCR2004-12098',
    location: 'Brasília',
    status: 'Reserva',
  },
  {
    id: 'e3',
    name: 'Ubiquiti EdgeSwitch',
    type: 'Switch',
    serialNumber: 'ES-24-44011',
    location: 'Vitória',
    status: 'Manutenção',
  },
];

export const locationOptions = [
  'brasilia',
  'confins',
  'curitiba',
  'florianópolis',
  'fortaleza',
  'galeão',
  'guarulhos',
  'macaé',
  'natal',
  'porto alegre',
  'viracopos',
  'vitória',
];

export const scheduleStatuses: ScheduleStatus[] = [
  'Trabalhando',
  'Folga',
  'Banco de horas',
  'Sobreaviso',
  'Atestado',
  'Férias',
];
