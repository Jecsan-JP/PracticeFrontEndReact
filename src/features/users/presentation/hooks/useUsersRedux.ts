import { useAppDispatch, useAppSelector } from "../../../../common/redux/store";
import { User } from "../../domain/models/User";
import {
  selectAllUsers,
  selectCurrentUser,
  selectUsersError,
  selectUsersStatus,
} from "../redux/selectorsUsers";
import {
  addUser,
  fetchUsers,
  removeUser,
  updateUser,
} from "../redux/UserSlice";

interface UseUsersReduxReturn {
  users: User[];
  currentUser: User | null;
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
  getUsers: () => void;
  createUser: (userData: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  getUserById: (userId: number) => User | undefined;
  isEmpty: boolean;
  isLoading: boolean;
}

export const useUsersRedux = (): UseUsersReduxReturn => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);

  return {
    users,
    currentUser,
    status,
    error,
    getUsers: () => dispatch(fetchUsers()),
    createUser: (userData: User) => dispatch(addUser(userData)),
    updateUser: (user: User) => dispatch(updateUser(user)),
    deleteUser: (userId: number) => dispatch(removeUser(userId)),
    getUserById: (userId: number) => users.find((user) => user.id === userId),
    isEmpty: users.length === 0,
    isLoading: status === "loading",
  };
};
