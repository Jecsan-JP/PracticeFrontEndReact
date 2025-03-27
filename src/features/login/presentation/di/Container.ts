import { AuthServiceUseCase } from "../../application/useCases/AuthServiceUseCase";
import { ILoginRepository } from "../../domain/repositories/ILoginRepository";
import { FirebaseAuthDataRepository } from "../../infrastructure/repositories/FirebaseAuthDataRepository";

//Instancias
const authRepository: ILoginRepository = new FirebaseAuthDataRepository();
const authUseCase = new AuthServiceUseCase(authRepository);

// Objeto contenedor
export const container = {
  authUseCase,
  authRepository,
};

// Tipo para TypeScript (opcional pero recomendado)
export type Container = typeof container;
