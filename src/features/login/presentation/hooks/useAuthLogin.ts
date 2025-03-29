import { useAppDispatch, useAppSelector } from "../../../../common/redux/store";
import { checkAuth, login, logoutUser } from "../redux/AuthLoginSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated: !!user,
    status,
    error,
    login: (credentials: { email: string; password: string }) =>
      dispatch(login(credentials)),
    logout: () => dispatch(logoutUser()),
    checkAuth: () => dispatch(checkAuth()),
  };
};
