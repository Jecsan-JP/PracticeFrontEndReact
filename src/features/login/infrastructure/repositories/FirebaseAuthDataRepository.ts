import {
  signInWithEmailAndPassword,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { LoginRequestDto } from "../../domain/models/LoginRequestDto";
import { User } from "../../../users/domain/models/User";
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

  async register(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.error("El correo ya está en uso.");
        throw new Error("Este correo ya está registrado. Usa otro.");
      } else {
        console.error("Error al registrar usuario en Firebase:", error.message);
        throw new Error("No se pudo registrar el usuario en Firebase.");
      }
    }
  }

  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCurrentUser(): User | null {
    throw new Error("Method not implemented.");
  }
}
