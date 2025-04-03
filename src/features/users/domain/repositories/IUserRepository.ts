import { User } from "../models/User";

export interface IUserRepository {
  getUsers(): Promise<User[]>;
  // getUsersById(idUser: number): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(idUser: number): Promise<boolean>;
}
