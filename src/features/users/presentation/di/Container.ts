import { http } from "../../../../common/presentation/di/di_frameworks";
import { ILoginRepository } from "../../../login/domain/repositories/ILoginRepository";
import { FirebaseAuthDataRepository } from "../../../login/infrastructure/repositories/FirebaseAuthDataRepository";
import { CreateUserUseCase } from "../../application/useCases/CreateUserUseCase";
import { DeleteUserUseCase } from "../../application/useCases/DeleteUserUseCase";
import { GetUsersUseCase } from "../../application/useCases/GetUsersUseCase";
import { UpdateUserUseCase } from "../../application/useCases/UpdateUserUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserDataRepository } from "../../infrastucture/repositories/UserDataRepository";

//Instancias
const userRepository: IUserRepository = new UserDataRepository(http);
const authRepository: ILoginRepository = new FirebaseAuthDataRepository();

const getUsersUseCase = new GetUsersUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository, authRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Objeto contenedor
export const container = {
  userRepository,
  getUsersUseCase,
  createUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
};

// Tipo para TypeScript (opcional pero recomendado)
export type Container = typeof container;
