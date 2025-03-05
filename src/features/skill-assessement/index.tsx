"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetSkillAssessmentsPublic from "@/hooks/api/skill-assessment/useGetSkillAssessmentsPublic";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { SkillAssessmentCard } from "./components/SkillAssessmentCard";
import SkillAssessmentCardSkeleton from "./components/SkillAssessmentCardSkeleton";
import { SkillAssessmentHeader } from "./components/SkillAssessmentHeader";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const SkillAssessmentListPage = () => {
  const session = useSession();
  const user = session.data?.user;
  const [isUser, setIsUser] = useState(false);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const { data: skillAssessments, isLoading } = useGetSkillAssessmentsPublic({
    page,
    sortOrder,
    sortBy,
    take: 12,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (user?.role === "USER") {
      setIsUser(true);
    }
  }, [user]);

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

  return (
    <>
      <div className="my-1 md:my-2">
        <div className="bg-[#f7f7f8]">
          <div className="container mx-auto flex items-center justify-between px-6 py-5">
            <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
              Skill Assessments
            </h1>
            <HomeBreadcrumb lastCrumb="Skill Assessments" />
          </div>
        </div>
        <div className="container mx-auto mt-4 w-full">
          <div className="mx-3">
            <SkillAssessmentHeader
              onSortOrderChange={handleSortOrderChange}
              onSortChange={handleSortChange}
              onSearch={handleSearch}
            />
            <div className="mb-5 mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {isLoading && (
                <>
                  <SkillAssessmentCardSkeleton />
                  <SkillAssessmentCardSkeleton />
                  <SkillAssessmentCardSkeleton />
                </>
              )}
              {skillAssessments?.data.map((skillAssessment, index) => (
                <SkillAssessmentCard
                  skillAssessment={skillAssessment}
                  key={index}
                  isUser={isUser}
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
