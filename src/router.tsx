import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/app-shell';
import { DashboardPage } from './pages/dashboard-page';
import { ClientsPage } from './pages/clients-page';
import { ClientDetailPage } from './pages/client-detail-page';
import { SchedulePage } from './pages/schedule-page';
import { ScheduleEditPage } from './pages/schedule-edit-page';
import { IpsPage } from './pages/ips-page';
import { UsersPage } from './pages/users-page';
import { EquipmentPage } from './pages/equipment-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'clientes', element: <ClientsPage /> },
      { path: 'clientes/:id', element: <ClientDetailPage /> },
      { path: 'escala', element: <SchedulePage /> },
      { path: 'escala/editar', element: <ScheduleEditPage /> },
      { path: 'ips', element: <IpsPage /> },
      { path: 'usuarios', element: <UsersPage /> },
      { path: 'equipamentos', element: <EquipmentPage /> },
    ],
  },
]);
