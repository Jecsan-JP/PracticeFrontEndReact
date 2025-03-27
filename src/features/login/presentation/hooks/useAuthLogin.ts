import { useAppDispatch, useAppSelector } from "../../../../common/redux/store";
import { LoginRequestDto } from "../../domain/models/LoginRequestDto";
import { login } from "../redux/AuthLoginSlice";


export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  return {
    user: authState.user,
    isAuthenticated: !!authState.user,
    status: authState.status,
    error: authState.error,
    login: (credentials: LoginRequestDto) => dispatch(login(credentials)),
    // logout: () => dispatch(logout()),
  };
};