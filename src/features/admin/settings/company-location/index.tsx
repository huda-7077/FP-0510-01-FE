import { Button } from "@/components/ui/button";
import { useDeleteCompanyLocation } from "@/hooks/api/company-location/useDeleteCompanyLocation";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import CompanyLocationsTable from "./components/CompanyLocationsTable";
import PaginationSection from "@/components/PaginationSection";
import { parseAsInteger, useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import useGetCompanyLocations from "@/hooks/api/company-location/useGetCompanyLocations";
import { AddLocationForm } from "./components/AddLocationModal";

export default function CompanyLocationSettings() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useGetCompanyLocations({
    page: page,
    take: 10,
    search: debouncedSearch,
  });

  const { mutate: deleteLocation, isPending: isDeleting } =
    useDeleteCompanyLocation();

  const locations = data?.data || [];
  const meta = data?.meta;

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Input
            placeholder="Search locations..."
            value={search}
            onChange={handleSearch}
            className="pl-9"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        <Button
          size="sm"
          className="bg-[#0a65cc] hover:bg-[#254e7e]"
          onClick={toggleAddForm}
        >
          {showAddForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <div className="rounded-lg border p-6 shadow-sm">
          <AddLocationForm onSuccess={() => setShowAddForm(false)} />
        </div>
      )}

      <CompanyLocationsTable
        locations={locations}
        isLoading={isLoading}
        isError={isError}
        onDeleteLocation={deleteLocation}
        isDeleting={isDeleting}
      />

      {meta && meta.total > meta.take && (
        <PaginationSection
          onChangePage={onChangePage}
          page={Number(page)}
          take={10}
          total={meta.total}
        />
      )}
    </div>
  );
}
