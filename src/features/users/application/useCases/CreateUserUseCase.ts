import { UseCase } from "../../../../common/domain/models/UseCase";
import { ILoginRepository } from "../../../login/domain/repositories/ILoginRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/models/User";
import { CreateUserDto } from "../../../login/domain/models/CreateUserDto";

export class CreateUserUseCase implements UseCase<CreateUserDto, User> {
  constructor(
    private userRepository: IUserRepository,
    private loginRepository: ILoginRepository
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    // Crear usuario en Firebase
    const firebaseUser = await this.loginRepository.register(
      data.user.email,
      data.password
    );
    if (!firebaseUser) {
      throw new Error("Error al registrar usuario en Firebase");
    }

    //Intentar crear el usuario en la base de datos
    try {
      return await this.userRepository.createUser(data.user);
    } catch (error) {
      console.error("Error al registrar usuario.", error);
      throw new Error("No se pudo registrar el usuario.");
    }
  }
}
