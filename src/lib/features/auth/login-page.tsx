import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from './use-login';
import { useAuth } from '../../core/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const { isLogged } = useAuth();
  const login = useLogin();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // Si ya tiene sesión activa, no muestra login
  if (isLogged) return <Navigate to="/tickets" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ usuario, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">BEA Sonora</CardTitle>
          <p className="text-sm text-muted-foreground">Mesa de control</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Usuario</label>
              <Input
                type="text"
                placeholder="usuario@ejemplo.com"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={login.isPending}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={login.isPending}
                required
              />
            </div>
            {login.isError && (
              <p className="text-sm text-destructive text-center">
                {login.error?.message ?? 'Credenciales inválidas'}
              </p>
            )}
            <Button type="submit" disabled={login.isPending} className="w-full">
              {login.isPending ? 'Entrando...' : 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}