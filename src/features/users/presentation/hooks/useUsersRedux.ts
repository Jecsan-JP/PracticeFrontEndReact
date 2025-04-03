import { useAppDispatch, useAppSelector } from "../../../../common/redux/store";
import { CreateUserDto } from "../../../login/domain/models/CreateUserDto";
import { User } from "../../domain/models/User";
import {
  selectAllUsers,
  selectCurrentUser,
  selectUsersError,
  selectUsersStatus,
} from "../redux/selectorsUsers";
import {
  createUser,
  deleteUser,
  editUser,
  fetchUsers,
} from "../redux/UserSlice";

interface UseUsersReduxReturn {
  users: User[];
  currentUser: User | null;
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
  getUsers: () => void;
  createUser: (data: CreateUserDto) => void;
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
    createUser: (data: CreateUserDto) => dispatch(createUser(data)),
    updateUser: (user: User) => dispatch(editUser(user)),
    deleteUser: (userId: number) => dispatch(deleteUser(userId)),
    getUserById: (userId: number) => users.find((user) => user.id === userId),
    isEmpty: users.length === 0,
    isLoading: status === "loading",
  };
};
