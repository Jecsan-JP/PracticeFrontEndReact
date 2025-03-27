import {
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";
import { LoginRequestDto } from "../../domain/models/LoginRequestDto";
import { User } from "../../domain/models/User";
import { ILoginRepository } from "../../domain/repositories/ILoginRepository";
import { auth } from "../../../../common/config/firebase";
import { FireBaseResultDto } from "../../domain/models/FireBaseResultDto";

export class FirebaseAuthDataRepository implements ILoginRepository {
  private toDomainUser(firebaseUser: FirebaseUser): FireBaseResultDto {
    return {
      id: firebaseUser.uid, // Mapeamos uid -> id
      email: firebaseUser.email || "", // Firebase devuelve email o null
      isEmailVerified: firebaseUser.emailVerified,
    };
  }

  async login(credentials: LoginRequestDto): Promise<FireBaseResultDto> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return this.toDomainUser(userCredential.user);
  }
  register(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCurrentUser(): User | null {
    throw new Error("Method not implemented.");
  }
}
