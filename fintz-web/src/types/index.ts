export interface User {
  id: string;
  name: string;
  email: string;
  cell: string;
}

export interface AuthResponse {
  access_token: string;
  expires_at: number; // Ou o tipo que sua API retorna para a expiração
}

export interface UserRegister {
  name: string;
  email: string;
  cell: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}