export interface User {
  id: string;
  name: string;
  email: string;
  cell: string;
}

// Novo tipo para dados de atualização
export interface UserUpdateData {
  name?: string;
  email?: string;
  cell?: string;
  // Não inclua a senha aqui para atualização de perfil
}

export interface AuthResponse {
  access_token: string; // Mudei de 'token' para 'access_token'
  user: User; // Ou o tipo que sua API retorna para a expiração
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