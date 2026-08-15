import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

interface Usuario {
  idUsuarioApp: string;
  idEmpleado: string;
  nombre: string;
  perfil: string;
  useremail: string;
  idEmpresa?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  estaLogueado: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  );

  const login = useCallback((newToken: string, newUsuario: Usuario) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('usuario', JSON.stringify(newUsuario));
    setToken(newToken);
    setUsuario(newUsuario);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  }, []);

  const value = useMemo(
    () => ({ usuario, token, login, logout, estaLogueado: !!token }),
    [usuario, token, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};