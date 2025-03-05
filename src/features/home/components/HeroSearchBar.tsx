"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { JobCategory } from "@/features/admin/job/consts";
import useGetRegencies from "@/hooks/api/location/useGetRegencies";
import { cn } from "@/lib/utils";
import { Check, MapPin, Search, Shapes } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

interface LocationFilterProps {
  setLocation: (value: string | null) => void;
}

const clampText = (text: string, maxLength: number = 30) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

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
          <span className="max-w-full truncate">
            {location
              ? clampText(
                  regencies?.find((reg) => reg.regency === location)?.regency ||
                    location,
                )
              : "Select Location"}
          </span>
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

function CategoryFilter({
  setCategory,
}: {
  setCategory: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [category, _] = useQueryState("category", {
    defaultValue: "",
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start border-none bg-transparent text-gray-500 shadow-none hover:bg-gray-100"
        >
          <Shapes className="mr-2 h-4 w-4 text-[#0062FF]" />
          <span className="max-w-full truncate">
            {category ? clampText(category) : "Select Category"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {JobCategory.map((cat) => (
                <CommandItem
                  key={cat}
                  onSelect={() => {
                    setCategory(cat);
                    setOpen(false);
                  }}
                >
                  {cat}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      category === cat ? "opacity-100" : "opacity-0",
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
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search")?.toString() || search;
    setSearch(searchTerm);

    const queryString = new URLSearchParams({
      search: searchTerm,
      category: category || "",
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
        <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#0062FF]" />
          <Input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, Keyword..."
            className="h-11 w-full truncate rounded-sm border-white pl-10 text-sm shadow-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
          <CategoryFilter setCategory={setCategory} />
        </div>
        <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
          <LocationFilter setLocation={setLocation} />
        </div>
        <Button
          type="submit"
          className="h-11 whitespace-nowrap rounded-sm bg-[#0062FF] px-3 font-medium text-white hover:bg-[#0056E0] sm:px-5"
        >
          <Search className="mr-2 h-5" />
          <span className="hidden md:inline">Search</span>
        </Button>
      </form>
    </div>
  );
};

export default HeroSearchBar;
