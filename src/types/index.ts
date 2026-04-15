export type Client = {
  id: string;
  corporateName: string;
  tradeName: string;
  contractor: string;
  contact: string;
  email: string;
  seller: string;
  accessCode: string;
  linkType: 'Banda dedicada' | 'Banda larga';
  ticketNumber: string;
  location: string;
  speed: string;
  installationSite: string;
  notes: string;
  status: 'Ativo' | 'Desativado';
  updatedAt: string;
};

export type ClientHistoryEntry = {
  ticketNumber: string;
  description: string;
  date: string;
};

export type ScheduleStatus =
  | 'Trabalhando'
  | 'Folga'
  | 'Banco de horas'
  | 'Sobreaviso'
  | 'Atestado'
  | 'Férias';

export type Collaborator = {
  id: string;
  name: string;
  supervisor: string;
  region: string;
  role: string;
  phone: string;
  shiftStart: string;
  shiftEnd: string;
  status: ScheduleStatus;
};

export type ScheduleDay = {
  date: string;
  assignments: {
    collaboratorId: string;
    status: ScheduleStatus;
  }[];
};

export type IpRecord = {
  id: string;
  address: string;
  client: string;
  status: 'Livre' | 'Alocado';
  gateway: string;
  updatedAt: string;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  profile: string;
  status: 'Ativo' | 'Inativo';
  lastAccess: string;
};

export type EquipmentRecord = {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  location: string;
  status: 'Operacional' | 'Manutenção' | 'Reserva';
};
