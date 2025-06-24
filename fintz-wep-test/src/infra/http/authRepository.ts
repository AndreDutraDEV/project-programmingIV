// src/infra/http/authRepository.ts
import { AuthRepository } from "@/domain/repositories/AuthRepository";
import api from "./apiClient";

// Defina o tipo esperado da resposta da API de login
type LoginResponse = {
  token: string;
};

export class HttpAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<string> {
    const response = await api.post<LoginResponse>("/api/login", { email, password });
    return response.data.token;
  }

  async register(data: {
    name: string;
    email: string;
    cell?: string;
    password: string;
  }): Promise<void> {
    await api.post("/api/users/register", data);
  }
}