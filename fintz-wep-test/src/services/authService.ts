// src/services/authService.ts
import { HttpAuthRepository } from "@/infra/http/authRepository";
import { LoginUseCase } from "@/domain/usecases/LoginUseCase";
import { RegisterUserUseCase } from "@/domain/usecases/RegisterUserUseCase";

const repository = new HttpAuthRepository();

export const loginUseCase = new LoginUseCase(repository);
export const registerUserUseCase = new RegisterUserUseCase(repository);