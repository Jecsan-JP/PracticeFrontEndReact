import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../domain/models/User";

export const ColumnsUsers: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "NOMBRE",
    accessorKey: "name",
  },
  {
    header: "USUARIO",
    accessorKey: "username",
  },
  {
    header: "EMAIL",
    accessorKey: "email",
  },
  {
    header: "DIRECCIÓN",
    accessorKey: "address.street",
    cell: (info) => {
      const address = info.row.original.address;
      return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
    },
  },
  {
    header: "TELÉFONO",
    accessorKey: "phone",
  },
  {
    header: "WEBSITE",
    accessorKey: "website",
  },
  {
    header: "COMPAÑÍA",
    accessorKey: "company.name",
    cell: (info) => {
      const company = info.row.original.company;
      return `${company.name} - ${company.catchPhrase}`;
    },
  },
  {
    header: "ACCIONES",
    accessorKey: "actions",
    cell: (info) => {
      const rowData = info.row.original;

      return (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const modal = document.getElementById(
                "modalUser"
              ) as HTMLDialogElement;
              modal?.showModal();
              // Aquí deberías tener tu lógica para setear el usuario a editar
              // userBloc.setUser(rowData);
            }}
            className="btn btn-primary"
          >
            Editar
          </button>
          <button
            onClick={() => {
              // swalDataManager().deleteItem("el usuario", async () => {
              //   await userBloc.deleteUser(rowData.id);
              // });
            }}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </div>
      );
    },
  },
];
