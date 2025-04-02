import { FireBaseResultDto } from "../models/FireBaseResultDto";
import { LoginRequestDto } from "../models/LoginRequestDto";
import { User } from "../../../users/domain/models/User";
import { UserCredential } from "firebase/auth";

export interface ILoginRepository {
  login(credentials: LoginRequestDto): Promise<FireBaseResultDto>;
  register(email: string, password: string): Promise<UserCredential>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
}
