import { UseCase } from "../../../../common/domain/models/UseCase";
import { User } from "../../domain/models/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UpdateUserUseCase implements UseCase<User, User> {
  constructor(private userRepository: IUserRepository) {}

  async execute(t: User): Promise<User> {
    try {
      return await this.userRepository.updateUser(t);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw new Error("No se pudo actualizar el usuario.");
    }
  }
}
