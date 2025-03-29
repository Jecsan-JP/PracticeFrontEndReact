import { http } from "../../../../common/presentation/di/di_frameworks";
import { GetUsersUseCase } from "../../application/useCases/GetUsersUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserDataRepository } from "../../infrastucture/repositories/UserDataRepository";

//Instancias
const userRepository: IUserRepository = new UserDataRepository(http);
const getUsersUseCase = new GetUsersUseCase(userRepository);

// Objeto contenedor
export const container = {
  userRepository,
  getUsersUseCase,
};

// Tipo para TypeScript (opcional pero recomendado)
export type Container = typeof container;
