import { FireBaseResultDto } from "../models/FireBaseResultDto";
import { LoginRequestDto } from "../models/LoginRequestDto";
import { User } from "../../../users/domain/models/User";

export interface ILoginRepository {
  login(credentials: LoginRequestDto): Promise<FireBaseResultDto>;
  register(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
}
