// features/login/domain/models/userModel.ts
export interface FireBaseResultDto {
  id: string;
  email: string;
  isEmailVerified: boolean; // ✅ Añade esta propiedad
}
