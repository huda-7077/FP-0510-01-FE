"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import PaginationSection from "@/components/PaginationSection";
import useGetBadges from "@/hooks/api/badge/useGetBadges";
import { parseAsInteger, useQueryState } from "nuqs";
import { BadgeCardSkeleton } from "./components/BadgeCardSkeleton";
import { BadgesCard } from "./components/BadgesCard";
import { BadgesHeader } from "./components/BadgesHeader";

const UserBadgesPage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: badges, isLoading } = useGetBadges({
    page,
    take: 16,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <DashboardBreadcrumb route="user" lastCrumb="Badges" />

      <div className="my-1 md:my-2">
        <div className="container mx-auto w-full px-1">
          <div>
            <BadgesHeader totalBadges={badges?.data.length || 0} />
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
              {isLoading && (
                <>
                  <BadgeCardSkeleton />
                  <BadgeCardSkeleton />
                  <BadgeCardSkeleton />
                  <BadgeCardSkeleton />
                </>
              )}
              {badges?.data.map((badge, index) => (
                <BadgesCard badge={badge} key={index} />
              ))}
            </div>
          </div>
          {badges &&
            badges.data.length > 0 &&
            badges.meta.total > badges.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={badges.meta.take || 4}
                total={badges.meta.total}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default UserBadgesPage;
