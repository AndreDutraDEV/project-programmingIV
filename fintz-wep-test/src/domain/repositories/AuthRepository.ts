// src/domain/repositories/AuthRepository.ts
export interface AuthRepository {
  login(email: string, password: string): Promise<string>;
  register(data: {
    name: string;
    email: string;
    cell?: string;
    password: string;
  }): Promise<void>;
}
