"use client";

import { WorkExperience } from "@/types/workExperience";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useGetWorkExperiences } from "@/hooks/api/work-experience/useGetWorkExperiences";
import { useDeleteWorkExperience } from "@/hooks/api/work-experience/useDeleteWorkExperience";
import WorkExperienceForm from "./WorkExperienceForm";
import { useEffect, useState } from "react";

export const WorkExperienceList = () => {
  const { data: workExperiences, isLoading } = useGetWorkExperiences();
  const { mutate: deleteWorkExperience } = useDeleteWorkExperience();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const columns: ColumnDef<WorkExperience>[] = [
    {
      header: "Company",
      accessorKey: "companyName",
    },
    {
      header: "Position",
      accessorKey: "jobTitle",
    },
    {
      header: "Duration",
      cell: ({ row }) => {
        const startDate = format(new Date(row.original.startDate), "MMM yyyy");
        const endDate = row.original.isCurrentJob
          ? "Present"
          : format(new Date(row.original.endDate!), "MMM yyyy");
        return `${startDate} - ${endDate}`;
      },
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="icon"
          onClick={() => deleteWorkExperience(row.original.id)}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4 p-6">
      <div className="flex items-center justify-between">
        {/* <h2 className="text-2xl font-bold">Work Experience</h2> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#0a65cc] hover:bg-[#254e7e]">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <WorkExperienceForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id || column.header?.toString()}>
                  {column.header?.toString()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {workExperiences?.length ? (
              workExperiences.map((experience: WorkExperience) => (
                <TableRow key={experience.id}>
                  <TableCell>{experience.companyName}</TableCell>
                  <TableCell>{experience.jobTitle}</TableCell>
                  <TableCell>
                    {format(new Date(experience.startDate), "MMM yyyy")} -{" "}
                    {experience.isCurrentJob
                      ? "Present"
                      : format(new Date(experience.endDate!), "MMM yyyy")}
                  </TableCell>
                  <TableCell>{experience.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteWorkExperience(experience.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No work experiences found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
