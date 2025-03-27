



// infrastructure/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { container } from '../di/Container';
import { LoginRequestDto } from '../../domain/models/LoginRequestDto';


interface AuthState {
  user: { id: string; email: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ id: string; email: string }>) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => initialState,
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
  },
});

export const login = (credentials: LoginRequestDto) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const {authUseCase} = container;
    const user = await authUseCase.login(credentials);
    dispatch(setCredentials(user));
  } catch (error) {
    // dispatch(setError(error.message));
  }
};

// Thunk para verificar sesión al cargar la app
// export const checkAuth = () => async (dispatch) => {
//   try {
//     const userData = await AuthService.getCurrentUser();
//     if (userData) {
//       dispatch(setCredentials(userData));
//     }
//   } catch (error) {
//     console.error("Error verificando autenticación:", error);
//   }
// };

export const { setCredentials, logout, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;