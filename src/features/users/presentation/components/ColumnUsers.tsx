import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../domain/models/User";

export const getColumnsUsers = (
  onEdit: (user: User) => void,
  onDelete: (id: number) => void
): ColumnDef<User>[] => [
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
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(row.original)}
          className="btn btn-primary btn-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(row.original.id)}
          className="btn btn-error btn-sm"
        >
          Eliminar
        </button>
      </div>
    ),
  },
];
