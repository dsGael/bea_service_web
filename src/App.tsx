import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './lib/features/auth/login-page';
import { ProtectedRoute } from './lib/core/router/protected-route';
import { TicketsListPage } from './lib/features/tickets/pages/TicketsListPage';
import { ChecadorPage } from './lib/features/checador/pages/ChecadorPage';
import { AppLayout } from './lib/core/layout/AppLayout';
import { SelectCatalogoPage } from './lib/features/catalogos/pages/SelectCatalogoPage';
import { CatalogoDetailPage } from './lib/features/catalogos/pages/CatalogoDetailPage';

// Placeholders — los reemplazas conforme construyas cada módulo
const AlmacenPage = () => <div className="p-6">Almacen — pendiente</div>;
const UsuariosPage = () => <div className="p-6">Usuarios — pendiente</div>;



export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
 
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route index element={<Navigate to="/tickets" replace />} />
      <Route path="/tickets" element={<TicketsListPage />} />
      <Route path="/tickets/:id" element={<TicketsListPage />} />
      <Route path="/checador" element={<ChecadorPage />} />
      <Route path="/almacen" element={<AlmacenPage />} />
      <Route path="/catalogos" element={<SelectCatalogoPage />} />
      <Route path="/catalogos/:slug" element={<CatalogoDetailPage />} />
      <Route path="/catalogos/:slug/:id" element={<CatalogoDetailPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
    </Route>
  </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}