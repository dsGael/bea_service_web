import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/core/auth/auth-context';
import LoginPage from './lib/features/auth/login-page';
import AppLayout from './lib/components/layout/app-layout';
import TicketsPage from './lib/features/tickets/tickets-page';
import ChecadorPage from './lib/features/checador/checador-page';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { estaLogueado } = useAuth();
  return estaLogueado ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/tickets" replace />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="checador" element={<ChecadorPage />} />
        {/* Agrega el resto de rutas aquí conforme las construyas */}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}