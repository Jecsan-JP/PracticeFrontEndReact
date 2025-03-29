import { UseCase } from "../../../../common/domain/models/UseCase";
import { User } from "../../domain/models/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class GetUsersUseCase implements UseCase<undefined, User[]> {
  constructor(private userRepository: IUserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}
