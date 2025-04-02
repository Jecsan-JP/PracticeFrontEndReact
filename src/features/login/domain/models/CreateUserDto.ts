import { User } from "../../../users/domain/models/User";

export interface CreateUserDto {
  user: User;
  password: string;
}
