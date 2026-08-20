import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './lib/features/auth/login-page';
import { ProtectedRoute } from './lib/core/router/protected-route';
import { TicketsListPage } from './lib/features/tickets/pages/TicketsListPage';

// Placeholders — los reemplazas conforme construyas cada módulo
const TicketsPage = () => <div className="p-6">Tickets — pendiente</div>;
const ChecadorPage = () => <div className="p-6">Checador — pendiente</div>;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/tickets" replace />} />
        <Route path="/tickets" element={<TicketsListPage />} />
        {/* <Route path="/tickets/:id" element={<TicketDetailPage />} /> */}
        <Route path="/checador" element={<ChecadorPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}