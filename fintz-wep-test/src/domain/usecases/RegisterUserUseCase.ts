// src/domain/usecases/RegisterUserUseCase.ts
import { AuthRepository } from "../repositories/AuthRepository";

export class RegisterUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: {
    name: string;
    email: string;
    cell?: string;
    password: string;
  }): Promise<void> {
    await this.authRepository.register(data);
  }
}