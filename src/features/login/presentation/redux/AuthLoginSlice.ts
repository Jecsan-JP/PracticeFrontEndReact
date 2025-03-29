// infrastructure/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { container } from "../di/Container";
import { LoginRequestDto } from "../../domain/models/LoginRequestDto";
import { AppDispatch } from "../../../../common/redux/store";
import { swalDataManager } from "../../../../common/presentation/di/di_frameworks";

interface AuthState {
  user: { id: string; email: string; isEmailVerified: boolean } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "failed";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
});

export const login =
  (credentials: LoginRequestDto) => async (dispatch: any) => {
    try {
      dispatch(setLoading());
      const { authUseCase } = container;
      const user = await authUseCase.execute(credentials);

      localStorage.setItem("auth", JSON.stringify(user));

      dispatch(setCredentials(user));
    } catch (error: any) {
      swalDataManager().showErrorMessage(
        "Credenciales inválidas, revisa el correo o contraseña",
        error
      );
    }
  };

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    console.log("checkAuth iniciado"); // Debug
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const user = JSON.parse(storedAuth);
      console.log("Usuario encontrado en localStorage:", user); // Debug
      dispatch(setCredentials(user)); // Actualiza el estado de Redux
    } else {
      console.log("No hay usuario en localStorage"); // Debug
    }
  } catch (error) {
    console.error("Error en checkAuth:", error); // Debug
  }
};

export const logoutUser = () => async (dispatch: any) => {
  localStorage.removeItem("auth");
  dispatch(logout());
};

export const { setCredentials, logout, setError, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
