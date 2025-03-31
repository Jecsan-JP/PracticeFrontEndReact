import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface TablePaginationsComponentProps<T> {
  data: T[];
  columns: any;
  totalRows?: number;
  onPageChange?: (pageIndex: number) => void;
  visibleColumnsKeys?: string[];
  storageKey?: string;
}

const TablePaginationsComponent = <T extends object>({
  data,
  columns,
  totalRows = data.length,
  onPageChange,
  visibleColumnsKeys = [],
  storageKey = "tablePageIndex",
}: TablePaginationsComponentProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState(""); //Filtro de la tabla

  // 1. Estado de paginación con persistencia local
  const [pagination, setPagination] = useState({
    pageIndex: parseInt(localStorage.getItem(storageKey) || "0", 10),
    pageSize: 10,
  });

  // 2. Filtrado de columnas visibles
  const filteredColumns =
    visibleColumnsKeys.length > 0
      ? columns.filter((column: any) =>
          visibleColumnsKeys.includes(column.accessorKey)
        )
      : columns;

  // 3. Configuración de la tabla
  const table = useReactTable({
    data,
    columns: filteredColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Asegúrate que esto esté incluido
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    state: {
      pagination,
      globalFilter, // Agrega el filtro al estado
    },
    onGlobalFilterChange: setGlobalFilter, // Maneja cambios en el filtro
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;

      setPagination(newPagination);
      localStorage.setItem(storageKey, newPagination.pageIndex.toString());
      onPageChange?.(newPagination.pageIndex);
    },
    manualPagination: !!onPageChange,
  });

  // 4. Efecto para sincronizar datos externos
  useEffect(() => {
    if (!onPageChange) {
      table.setPageIndex(0);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Campo de búsqueda */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Buscar..."
          className="input input-bordered w-full max-w-xs"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200 text-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-base-100">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No hay información disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <div>
          Mostrando {table.getRowModel().rows.length} de {totalRows} registros
        </div>
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button className="join-item btn">
            Página {table.getState().pagination.pageIndex + 1}
          </button>
          <button
            className="join-item btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePaginationsComponent;
