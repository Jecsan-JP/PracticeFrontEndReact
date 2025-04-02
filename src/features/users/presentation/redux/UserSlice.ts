import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../domain/models/User";
import { swalDataManager } from "../../../../common/presentation/di/di_frameworks";
import { AppDispatch } from "../../../../common/redux/store";
import { container } from "../di/Container";
import { CreateUserDto } from "../../../login/domain/models/CreateUserDto";

interface UserState {
  currentUser: User | null;
  users: User[];
  status: "idle" | "loading" | "succeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      (state.status = "succeded"), (state.error = null);
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.status = "succeded";
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "failed";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "succeded" | "failed">
    ) => {
      state.status = action.payload;
    },
    resetUserState: () => initialState,
  },
});

// Acciones asíncronas usando los useCases
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const { getUsersUseCase } = container;
    const users = await getUsersUseCase.execute();
    dispatch(setUsers(users));
  } catch (error: any) {
    dispatch(setError(error.message));
    swalDataManager().showErrorMessage("Error al cargar usuarios", error);
  }
};

export const createUser =
  (data: CreateUserDto) => async (dispatch: AppDispatch) => {
    const user: Omit<User, "id"> = data.user;
    try {
      dispatch(setLoading());
      const { createUserUseCase } = container;
      const newUser = await createUserUseCase.execute({
        user: user,
        password: data.password,
      } as CreateUserDto);
      console.log(
        "Después de ejecutar el use case respuesta del ws create user",
        newUser
      );
      dispatch(addUser(newUser));
      dispatch(setStatus("succeded"));
      swalDataManager().showSuccesMessage(
        "Exito!",
        "Usuario creado exitosamente"
      );
      return newUser;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setStatus("failed"));
      swalDataManager().showErrorMessage("Error al crear usuario", error);
      throw error;
    }
  };

//   export const editUser = (id: string, userData: Partial<User>) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading());
//       const { getUsersUseCase } = container;
//       const updatedUser = await getUsersUseCase.updateUser(id, userData);
//       dispatch(updateUser(updatedUser));
//       swalDataManager().showSuccessMessage("Usuario actualizado exitosamente");
//       return updatedUser;
//     } catch (error: any) {
//       dispatch(setError(error.message));
//       swalDataManager().showErrorMessage(
//         "Error al actualizar usuario",
//         error
//       );
//       throw error;
//     }
//   };

//   export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading());
//       const { getUsersUseCase } = container;
//       await getUsersUseCase.deleteUser(id);
//       dispatch(removeUser(id));
//       swalDataManager().showSuccesMessage("Exito!","Usuario eliminado exitosamente");
//     } catch (error: any) {
//       dispatch(setError(error.message));
//       swalDataManager().showErrorMessage(
//         "Error al eliminar usuario",
//         error
//       );
//       throw error;
//     }
//   };

export const {
  setUsers,
  setCurrentUser,
  setStatus,
  addUser,
  updateUser,
  removeUser,
  setError,
  setLoading,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
