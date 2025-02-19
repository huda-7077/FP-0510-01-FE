"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetPayments from "@/hooks/api/payment/useGetPayments";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { SkillAssessmentHeader } from "./components/SkillAssessmentHeader";
import useGetSkillAssessments from "@/hooks/api/skill-assessment/useGetSkillAssessments";
import { SkillAssessmentCard } from "./components/SkillAssessmentCard";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import SkillAssessmentCardSkeleton from "./components/SkillAssessmentCardSkeleton";

export const SkillAssessmentListComponent = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });

  const { data: skillAssessments, isLoading } = useGetSkillAssessments({
    page,
    sortOrder,
    sortBy,
    take: 10,
    search: debouncedSearch,
    status,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const onStatusChange = (status: string) => {
    if (status === "ALL") {
      setStatus("");
      setPage(1);
      return;
    }
    setStatus(status);
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };
  const handleSortOrderChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
  };

  return (
    <>
      <DashboardBreadcrumb route="developer" lastCrumb="Skill Assessments" />
      <div className="my-1 md:my-2">
        <div className="container mx-auto w-full">
          <div>
            <SkillAssessmentHeader
              totalSkillAssessments={skillAssessments?.data.length || 0}
              onSortOrderChange={handleSortOrderChange}
              onStatusChange={onStatusChange}
              onSortChange={handleSortChange}
              onSearch={handleSearch}
            />
            <div className="mt-4 grid gap-2 sm:space-y-2">
              {isLoading && (
                <>
                  <SkillAssessmentCardSkeleton />
                  <SkillAssessmentCardSkeleton />
                  <SkillAssessmentCardSkeleton />
                  <SkillAssessmentCardSkeleton />
                  <SkillAssessmentCardSkeleton />
                </>
              )}
              {skillAssessments?.data.map((skillAssessment, index) => (
                <SkillAssessmentCard
                  skillAssessment={skillAssessment}
                  key={index}
                />
              ))}
            </div>
          </div>
          {skillAssessments &&
            skillAssessments.data.length > 0 &&
            skillAssessments.meta.total > skillAssessments.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={skillAssessments.meta.take || 4}
                total={skillAssessments.meta.total}
              />
            )}
        </div>
      </div>
    </>
  );
};
