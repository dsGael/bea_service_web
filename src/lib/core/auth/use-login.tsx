import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/auth/auth-context';
import { apiClient } from '../../core/api/axios-client';

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (datos: { identificador: string; password: string }) => {
      const res = await apiClient.post('/auth/login', datos);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.access_token, data.usuario);
      navigate('/tickets');
    },
  });
}