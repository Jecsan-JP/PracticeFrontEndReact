import { RootState } from "../../../../common/redux/store";
import { User } from "../../domain/models/User";

export const selectUsersState = (state: RootState) => state.users;

// Selectores con tipos explícitos
export const selectCurrentUser = (state: RootState): User | null =>
  state.users.currentUser;

export const selectAllUsers = (state: RootState): User[] => state.users.users;

export const selectUserById = (
  state: RootState,
  userId: string | number
): User | undefined =>
  state.users.users.find((user: User) => user.id === userId);

export const selectUsersStatus = (
  state: RootState
): "idle" | "loading" | "succeded" | "failed" => state.users.status;

export const selectUsersError = (state: RootState): string | null =>
  state.users.error;
