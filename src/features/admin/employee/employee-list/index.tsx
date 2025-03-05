"use client";

import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import PaginationSection from "@/components/PaginationSection";
import useGetEmployees from "@/hooks/api/employee/useGetEmployees";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { EmployeeListHeader } from "./component/EmployeeListHeader";
import { EmployeeCard } from "./component/EmployeeCard";
import LoadingSkeleton from "./component/skeletons/EmployeeListSkeleton";

export const EmployeeListComponent = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const { data: employees, isPending: isEmployeesPending } = useGetEmployees({
    page,
    sortOrder,
    sortBy,
    take: 10,
    search: debouncedSearch,
  });

  const notFound =
    !isEmployeesPending && employees && employees?.data.length === 0;

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
      <div className="rounded-lg bg-white">
        <div className="space-y-2 md:space-y-3">
          <div className="mb-6">
            <div className="w-full">
              <EmployeeListHeader
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                onSortOrderChange={handleSortOrderChange}
                totalEmployee={employees?.meta.total || 0}
              />
            </div>
          </div>

          {notFound ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50">
              <DataNotFound title="No Employee Found" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 md:gap-4">
              {isEmployeesPending && <LoadingSkeleton />}
              {employees?.data.map((employee) => (
                <EmployeeCard employee={employee} key={employee.id} />
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-2 border-t border-gray-100 pt-6">
            {employees &&
              employees.data.length > 0 &&
              employees.meta.total > employees.meta.take && (
                <PaginationSection
                  onChangePage={onChangePage}
                  page={Number(page)}
                  take={employees.meta.take || 4}
                  total={employees.meta.total}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};
