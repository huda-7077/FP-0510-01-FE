import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteCompanyLocation } from "@/hooks/api/company-location/useDeleteCompanyLocation";
import { useGetCompanyLocations } from "@/hooks/api/company-location/useGetCompanyLocations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddLocationModal } from "./components/AddLocationModal";
import CompanyLocationsTable from "./components/CompanyLocationsTable";

export default function CompanyLocationSettings() {
  const [open, setOpen] = useState(false);

  const { data: locations = [], isLoading, isError } = useGetCompanyLocations();
  const { mutate: deleteLocation, isPending: isDeleting } =
    useDeleteCompanyLocation();

  return (
    <div className="container mx-auto space-y-4 p-6">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#0a65cc] hover:bg-[#254e7e]">
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <AddLocationModal onSuccess={() => setOpen(false)} />
        </Dialog>
      </div>

      <CompanyLocationsTable
        locations={locations}
        isLoading={isLoading}
        isError={isError}
        onDeleteLocation={deleteLocation}
        isDeleting={isDeleting}
      />
    </div>
  );
}
