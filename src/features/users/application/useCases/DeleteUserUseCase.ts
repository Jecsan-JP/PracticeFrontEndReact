import { UseCase } from "../../../../common/domain/models/UseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class DeleteUserUseCase implements UseCase<number, boolean> {
  constructor(private userRepository: IUserRepository) {}

  async execute(t: number): Promise<boolean> {
    try {
      return await this.userRepository.deleteUser(t);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw new Error("No se pudo eliminar el usuario.");
    }
  }
}
