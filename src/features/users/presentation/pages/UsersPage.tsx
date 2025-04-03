import { useEffect, useMemo, useState } from "react";
import TablePaginationsComponent from "../../../../common/react-table/table/components/TablePaginationsComponent";
// import { ColumnsUsers } from "../components/ColumnUsers";
import { useUsersRedux } from "../hooks/useUsersRedux";
import ModalWidthComponent from "../../../../common/presentation/components/modals/ModalWidthComponent";
import { useDialog } from "../../../../common/hooks/useDialog";
import { User } from "../../domain/models/User";
import { UserForm } from "../components/forms/UserForm";
import { getColumnsUsers } from "../components/ColumnUsers";
import { swalDataManager } from "../../../../common/presentation/di/di_frameworks";

const UsersPage = () => {
  const { users, isLoading, getUsers, deleteUser } = useUsersRedux();
  const { showModal, closeModal } = useDialog("modalUser");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Función para manejar edición
  const handleEdit = (user: User) => {
    setEditingUser(user);
    showModal();
  };

  // Función para manejar eliminación
  const handleDelete = (id: number) => {
    swalDataManager().deleteItem("el usuario", async () => {
      if (id !== 0) {
        await deleteUser(id);
      }
    });
  };
  const columns = useMemo(() => getColumnsUsers(handleEdit, handleDelete), []);

  useEffect(() => {
    getUsers();
  }, []);

  const handleCreateClick = () => {
    setEditingUser(null);
    showModal();
  };

  return (
    <>
      {" "}
      <h1 className="flex items-center gap-x-2 text-[40px] font-bold text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
        Usuarios
      </h1>
      <div className="divider m-0 divider-primary"></div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleCreateClick}
          className="btn btn-primary mt-4 rounded-lg px-4 py-2 text-white "
        >
          Agregar
        </button>
      </div>
      {isLoading ? (
        <label>Cargando...</label>
      ) : (
        <TablePaginationsComponent
          data={users || []}
          columns={columns}
          totalRows={users?.length || 0}
        />
      )}
      <ModalWidthComponent id="modalUser">
        <UserForm
          user={editingUser || undefined}
          onClose={closeModal}
          onSuccess={closeModal}
        />
      </ModalWidthComponent>
    </>
  );
};

export default UsersPage;
