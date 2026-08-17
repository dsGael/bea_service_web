import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../core/api/axios-client';
import { useAuth } from '../../core/auth/auth-context';
import type { LoginRequest, LoginResponse } from '../../core/auth/types';

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (datos: LoginRequest): Promise<LoginResponse> => {
      const res = await apiClient.post<LoginResponse>('/auth/login', datos);
      return res.data;
    },
    onSuccess: ({ access_token, usuario }) => {
      login(access_token, usuario);
      navigate('/tickets', { replace: true });
    },
    // onError no hace falta aquí — el error normalizado del interceptor
    // se puede leer con mutation.error en el componente
  });
}