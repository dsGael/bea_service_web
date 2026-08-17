import { createContext, useContext, useState } from 'react';
import type {ReactNode} from 'react';
export interface Usuario {
  idUsuarioApp: string;
  idEmpleado: string | null;
  nombre: string;
  perfil: string;
  useremail: string;
  especialidad?: string;
  idEmpresa?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  isLogged: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function cargarDesdeStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(
    () => cargarDesdeStorage<Usuario>('usuario')
  );
  
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  );

  const login = (newToken: string, newUsuario: Usuario) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('usuario', JSON.stringify(newUsuario));
    setToken(newToken);
    setUsuario(newUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, isLogged: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}