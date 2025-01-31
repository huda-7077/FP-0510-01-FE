import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { Separator } from "@/components/ui/separator";
import { ApplicationCard } from "./ApplicationCard";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import useGetJobApplications from "@/hooks/api/job-applications/useGetJobApplications";
import { JobApplicationListHeader } from "./JobApplicationListHeader";
import useGetEducationLevelsByJobId from "@/hooks/api/user/useGetEducationLevelsByJobId";
import PaginationSection from "@/components/PaginationSection";

interface JobApplicationsListProps {
  jobId: number;
}

export const JobApplicationsList = ({ jobId }: JobApplicationsListProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "id" });
  const [debouncedSearch] = useDebounce(search, 500);
  const [educationLevel, setEducationLevel] = useQueryState("educationLevel", {
    defaultValue: "",
  });

  const { data: jobApplications, isPending: isJobApplicationsPending } =
    useGetJobApplications({
      page,
      sortOrder: "asc",
      sortBy,
      take: 10,
      search: debouncedSearch,
      jobId,
      educationLevel,
    });

  const { data: educationLevels } = useGetEducationLevelsByJobId({
    jobId,
  });

  if (
    !isJobApplicationsPending &&
    jobApplications &&
    jobApplications?.data.length === 0
  ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50">
        <DataNotFound title="No Applications Found" />
      </div>
    );
  }

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const onEducationLevelChange = (educationLevel: string) => {
    if (educationLevel === "all") {
      setEducationLevel("");
      setPage(1);
      return;
    }
    setEducationLevel(educationLevel);
    setPage(1);
  };

  const validEducationLevels = educationLevels?.data ?? [];

  return (
    <div className="rounded-lg bg-white">
      <div className="space-y-2 md:space-y-3">
        <div className="mb-6">
          <div className="w-full">
            <JobApplicationListHeader
              userEducationLevels={validEducationLevels}
              onSearch={handleSearch}
              onSortChange={handleSortChange}
              onEducationLevelChange={onEducationLevelChange}
              totalJobApplications={jobApplications?.meta.total || 0}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 md:gap-4">
          {jobApplications?.data.map((application) => (
            <ApplicationCard application={application} key={application.id} />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 border-t border-gray-100 pt-6">
          {jobApplications &&
            jobApplications.data.length > 0 &&
            jobApplications.meta.total > jobApplications.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={jobApplications.meta.take || 4}
                total={jobApplications.meta.total}
              />
            )}
        </div>
      </div>
    </div>
  );
};
