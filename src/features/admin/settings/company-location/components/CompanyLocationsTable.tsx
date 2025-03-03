import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, MapPin, Mailbox } from "lucide-react";
import type { CompanyLocation } from "@/types/companyLocation";
import React from "react";

interface CompanyLocationsTableProps {
  locations: CompanyLocation[];
  isLoading: boolean;
  isError: boolean;
  onDeleteLocation: (id: number) => void;
  isDeleting: boolean;
}

const CompanyLocationsTable = ({
  locations,
  isLoading,
  isError,
  onDeleteLocation,
  isDeleting,
}: CompanyLocationsTableProps) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-background p-4 text-center text-destructive">
        Error loading company locations
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[300px]">Address</TableHead>
              <TableHead>Postal Code</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Regency</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="py-8 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Loading locations...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : locations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="py-8 text-center">No locations found</div>
                </TableCell>
              </TableRow>
            ) : (
              locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">
                    {location.address}
                  </TableCell>
                  <TableCell>{location.postalCode}</TableCell>
                  <TableCell>
                    {location.regency?.province?.province || "Unknown"}
                  </TableCell>
                  <TableCell>
                    {location.regency
                      ? `${location.regency.regency} (${location.regency.type})`
                      : "Unknown"}
                  </TableCell>
                  <TableCell>
                    {formatDate(location.createdAt.toLocaleString())}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onDeleteLocation(location.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="mr-1 h-4 w-4" />
                      )}
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {isLoading ? (
          <div className="py-8 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
            <p className="mt-2 text-sm text-muted-foreground">
              Loading locations...
            </p>
          </div>
        ) : locations.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">No locations found.</p>
          </div>
        ) : (
          locations.map((location) => (
            <div
              key={location.id}
              className="rounded-md border-[1px] bg-card p-4 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold">
                      {location.address}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {location.regency?.province?.province || "Unknown"},{" "}
                      {location.regency?.regency || "Unknown"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => onDeleteLocation(location.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Mailbox size={14} className="mr-1" />
                  {location.postalCode}
                </div>
                <div>
                  <span className="font-medium">Created:</span>
                  <br />
                  {formatDate(location.createdAt.toLocaleString())}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(CompanyLocationsTable);
