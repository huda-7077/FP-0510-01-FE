import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import PaginationSection from "@/components/PaginationSection";
import useGetJobApplications from "@/hooks/api/job-applications/useGetJobApplications";
import useGetEducationLevelsByJobId from "@/hooks/api/user/useGetEducationLevelsByJobId";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { ApplicationCard } from "./ApplicationCard";
import { JobApplicationListHeader } from "./JobApplicationListHeader";
import JobApplicationListSkeleton from "./skeletons/JobApplicationListSkeleton";

interface JobApplicationsListProps {
  jobId: number;
}

export const JobApplicationsList = ({ jobId }: JobApplicationsListProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const [educationLevel, setEducationLevel] = useQueryState("educationLevel", {
    defaultValue: "",
  });
  const [maxExpectedSalary, setMaxExpectedSalary] = useQueryState(
    "maxExpectedSalary",
    {
      defaultValue: "",
    },
  );
  const [minExpectedSalary, setMinExpectedSalary] = useQueryState(
    "minExpectedSalary",
    {
      defaultValue: "",
    },
  );
  const [debouncedMaxExpectedSalary] = useDebounce(maxExpectedSalary, 500);
  const [debouncedMinExpectedSalary] = useDebounce(minExpectedSalary, 500);

  const { data: jobApplications, isPending: isJobApplicationsPending } =
    useGetJobApplications({
      page,
      sortOrder,
      sortBy,
      take: 10,
      search: debouncedSearch,
      jobId,
      educationLevel,
      maxExpectedSalary: parseInt(debouncedMaxExpectedSalary),
      minExpectedSalary: parseInt(debouncedMinExpectedSalary),
    });

  const { data: educationLevels } = useGetEducationLevelsByJobId({
    jobId,
  });

  const notFound =
    !isJobApplicationsPending &&
    jobApplications &&
    jobApplications?.data.length === 0;

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

  const handleSortOrderChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
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

  const onMaxExpectedSalaryChange = (maxExpectedSalary: string) => {
    if (maxExpectedSalary === "0") {
      setMaxExpectedSalary("0");
      setPage(1);
      return;
    }
    setMaxExpectedSalary(maxExpectedSalary);
    setPage(1);
  };

  const onMinExpectedSalaryChange = (minExpectedSalary: string) => {
    if (minExpectedSalary === "0") {
      setMinExpectedSalary("0");
      setPage(1);
      return;
    }
    setMinExpectedSalary(minExpectedSalary);
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
              onSortOrderChange={handleSortOrderChange}
              onEducationLevelChange={onEducationLevelChange}
              onMaxExpectedSalaryChange={onMaxExpectedSalaryChange}
              onMinExpectedSalaryChange={onMinExpectedSalaryChange}
              totalJobApplications={jobApplications?.meta.total || 0}
            />
          </div>
        </div>

        {notFound ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50">
            <DataNotFound title="No Applications Found" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 md:gap-4">
            {isJobApplicationsPending && <JobApplicationListSkeleton />}
            {jobApplications?.data.map((application) => (
              <ApplicationCard application={application} key={application.id} />
            ))}
          </div>
        )}

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
