"use client"; // Ensure this is a Client Component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, MapPin, Search, Shapes } from "lucide-react";
import { cn } from "@/lib/utils";
import useGetRegencies from "@/hooks/api/location/useGetRegencies";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { JobCategory } from "@/features/admin/job/create-job/consts";

interface LocationFilterProps {
  setLocation: (value: string | null) => void;
}

function LocationFilter({ setLocation }: LocationFilterProps) {
  const [open, setOpen] = useState(false);
  const [location, _] = useQueryState("location", {
    defaultValue: "",
  });
  const { data: regencies, isPending } = useGetRegencies();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start border-none bg-transparent text-gray-500 shadow-none hover:bg-gray-100"
        >
          <MapPin className="mr-2 h-4 w-4 text-[#0062FF]" />
          {location
            ? regencies?.find((reg) => reg.regency === location)?.regency
            : "Select Location"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {regencies?.map((reg) => (
                <CommandItem
                  key={reg.id}
                  onSelect={() => {
                    setLocation(reg.regency);
                    setOpen(false);
                  }}
                >
                  {reg.regency}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      location === reg.regency ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const HeroSearchBar = () => {
  const [location, setLocation] = useQueryState("location", {
    defaultValue: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    const queryString = new URLSearchParams({
      search,
      category,
      location: location || "",
    }).toString();

    window.location.href = `/jobs?${queryString}`;
  };

  return (
    <div className="mx-auto w-full max-w-4xl bg-white p-3 shadow-sm sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2"
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#0062FF]" />
          <Input
            type="text"
            name="search"
            placeholder="Job title, Keyword..."
            className="h-11 w-full rounded-sm border-white pl-10 shadow-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="relative flex-1">
          <Select name="category">
            <SelectTrigger className="border-none shadow-none">
              <span className="text-[#0062FF]">
                <Shapes className="h-4" />
              </span>
              <SelectValue
                placeholder={<span style={{ color: "gray" }}>Category</span>}
              />
            </SelectTrigger>
            <SelectContent>
              {JobCategory.map((category, idx) => (
                <SelectItem key={idx} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1">
          <LocationFilter setLocation={setLocation} />
        </div>

        <Button
          type="submit"
          className="h-11 rounded-sm bg-[#0062FF] px-3 font-medium text-white hover:bg-[#0056E0] sm:px-5"
        >
          <Search className="h-5" />
        </Button>
      </form>
    </div>
  );
};

export default HeroSearchBar;
