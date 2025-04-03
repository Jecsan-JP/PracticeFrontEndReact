import { HttpManager } from "../../../../common/http/HttpManager";
import { User } from "../../domain/models/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UserDataRepository implements IUserRepository {
  constructor(private http: HttpManager) {}

  getUsers(): Promise<User[]> {
    return this.http.get({
      endpoint: "/users",
    });
  }

  getUsersById(idUser: number): Promise<User> {
    throw new Error("Method not implemented.");
  }

  createUser(user: User): Promise<User> {
    return this.http.post<User>({
      endpoint: "/users",
      body: user,
    });
  }

  updateUser(user: User): Promise<User> {
    return this.http.put<User>({
      endpoint: `/users/${user.id}`,
      body: user,
    });
  }

  deleteUser(idUser: number): Promise<boolean> {
    return this.http.delete<boolean>({
      endpoint: `/users/${idUser}`,
    });
  }
}
