import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CompanyLocation } from "@/types/companyLocation";

interface CompanyLocationsTableProps {
  locations: CompanyLocation[];
  isLoading: boolean;
  isError: boolean;
  onDeleteLocation: (id: number) => void;
  isDeleting: boolean;
}

export default function CompanyLocationsTable({
  locations,
  isLoading,
  isError,
  onDeleteLocation,
  isDeleting,
}: CompanyLocationsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<CompanyLocation>[] = [
    {
      header: "Address",
      accessorKey: "address",
      size: 300,
    },
    {
      header: "Postcode",
      accessorKey: "postalCode",
      size: 120,
    },
    {
      header: "Province",
      accessorFn: (row) => row.regency?.province?.province || "Unknown",
      size: 150,
    },
    {
      header: "Regency",
      accessorFn: (row) =>
        row.regency
          ? `${row.regency.regency} (${row.regency.type})`
          : "Unknown",
      size: 150,
    },
    {
      header: "Latitude",
      accessorKey: "latitude",
      size: 120,
    },
    {
      header: "Longitude",
      accessorKey: "longitude",
      size: 120,
    },
    {
      header: "Created At",
      accessorFn: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
      size: 120,
    },
    {
      id: "actions",
      size: 60,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDeleteLocation(row.original.id)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: locations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-background p-4 text-center text-destructive">
        Error loading company locations
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                  className="h-11"
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <div
                      className={cn(
                        "flex h-full cursor-pointer select-none items-center gap-2",
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No locations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
