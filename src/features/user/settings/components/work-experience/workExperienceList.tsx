import type { WorkExperience } from "@/types/workExperience";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2, Plus, Trash2, SearchIcon, X } from "lucide-react";
import { useDeleteWorkExperience } from "@/hooks/api/work-experience/useDeleteWorkExperience";
import WorkExperienceForm from "./WorkExperienceForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import PaginationSection from "@/components/PaginationSection";
import useGetWorkExperiences from "@/hooks/api/work-experience/useGetWorkExperiences";

export const WorkExperienceList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedSearch] = useDebounce(search, 500);
  const [showAddForm, setShowAddForm] = useState(false);

  const { data, isLoading } = useGetWorkExperiences({
    page: page,
    take: 10,
    search: debouncedSearch,
  });
  const { mutate: deleteWorkExperience } = useDeleteWorkExperience();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const workExperiences = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Input
            placeholder="Search experiences..."
            value={search}
            onChange={handleSearch}
            className="pl-9"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
        <Button
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
              Add Experience
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <div className="rounded-lg border p-6 shadow-sm">
          <WorkExperienceForm onSuccess={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="w-full">
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : workExperiences.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No work experiences found.
                  </TableCell>
                </TableRow>
              ) : (
                workExperiences.map((experience: WorkExperience) => (
                  <TableRow key={experience.id}>
                    <TableCell className="font-medium">
                      {experience.companyName}
                    </TableCell>
                    <TableCell>{experience.jobTitle}</TableCell>
                    <TableCell>
                      {format(new Date(experience.startDate), "MMM yyyy")} -{" "}
                      {experience.isCurrentJob
                        ? "Present"
                        : format(new Date(experience.endDate!), "MMM yyyy")}
                    </TableCell>
                    <TableCell>{experience.description}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWorkExperience(experience.id)}
                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
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
                Loading experiences...
              </p>
            </div>
          ) : workExperiences.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                No work experiences found.
              </p>
            </div>
          ) : (
            workExperiences.map((experience: WorkExperience) => (
              <div
                key={experience.id}
                className="rounded-md border-[1px] bg-card p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-base font-semibold">
                        {experience.jobTitle}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {experience.companyName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteWorkExperience(experience.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Duration: </span>
                    {format(new Date(experience.startDate), "MMM yyyy")} -{" "}
                    {experience.isCurrentJob
                      ? "Present"
                      : format(new Date(experience.endDate!), "MMM yyyy")}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Description: </span>
                    {experience.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
};
