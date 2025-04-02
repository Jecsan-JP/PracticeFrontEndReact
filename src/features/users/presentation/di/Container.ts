import { http } from "../../../../common/presentation/di/di_frameworks";
import { ILoginRepository } from "../../../login/domain/repositories/ILoginRepository";
import { FirebaseAuthDataRepository } from "../../../login/infrastructure/repositories/FirebaseAuthDataRepository";
import { CreateUserUseCase } from "../../application/useCases/CreateUserUseCase";
import { GetUsersUseCase } from "../../application/useCases/GetUsersUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserDataRepository } from "../../infrastucture/repositories/UserDataRepository";

//Instancias
const userRepository: IUserRepository = new UserDataRepository(http);
const authRepository: ILoginRepository = new FirebaseAuthDataRepository();

const getUsersUseCase = new GetUsersUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository, authRepository);

// Objeto contenedor
export const container = {
  userRepository,
  getUsersUseCase,
  createUserUseCase,
};

// Tipo para TypeScript (opcional pero recomendado)
export type Container = typeof container;
