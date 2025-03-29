import { UseCase } from "../../../../common/domain/models/UseCase";
import { FireBaseResultDto } from "../../domain/models/FireBaseResultDto";
import { LoginRequestDto } from "../../domain/models/LoginRequestDto";
import { ILoginRepository } from "../../domain/repositories/ILoginRepository";

export class AuthServiceUseCase
  implements UseCase<LoginRequestDto, FireBaseResultDto>
{
  constructor(private loginRepository: ILoginRepository) {}
  execute(t: LoginRequestDto): Promise<FireBaseResultDto> {
    if (!t.email || !t.password) throw new Error("Credenciales inválidas");
    return this.loginRepository.login(t);
  }

  async getCurrentUser() {
    return this.loginRepository.getCurrentUser(); // Añade este método a ILoginRepository
  }
}
