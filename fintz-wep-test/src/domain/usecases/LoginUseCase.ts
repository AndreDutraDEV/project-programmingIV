// src/domain/usecases/LoginUseCase.ts
import { AuthRepository } from "../repositories/AuthRepository";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<string> {
    return await this.authRepository.login(email, password);
  }
}
