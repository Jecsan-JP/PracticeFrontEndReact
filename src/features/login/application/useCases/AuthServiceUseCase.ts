import { LoginRequestDto } from "../../domain/models/LoginRequestDto";
import { ILoginRepository } from "../../domain/repositories/ILoginRepository";

export class AuthServiceUseCase {
  constructor(private loginRepository: ILoginRepository) {}

  async login(credentials: LoginRequestDto) {
    if (!credentials.email || !credentials.password)
      throw new Error("Credenciales inválidas");
    return this.loginRepository.login(credentials);
  }

  async getCurrentUser() {
    return this.loginRepository.getCurrentUser(); // Añade este método a ILoginRepository
  }
}
