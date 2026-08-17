export interface LoginRequest {
  usuario: string; // idEmpleado o useremail
  password: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: {
    idUsuarioApp: string;
    idEmpleado: string | null;
    nombre: string;
    perfil: string;
    useremail: string;
    especialidad?: string;
    idEmpresa?: string;
  };
}