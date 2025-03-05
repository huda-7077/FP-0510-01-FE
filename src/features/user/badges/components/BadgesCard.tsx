"use client";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeData } from "@/types/badge";
import Image from "next/image";
import { useState } from "react";
import { SlBadge } from "react-icons/sl";
import { DetailsDialog } from "./DetailsDialog";

interface BadgesCardProps {
  badge: BadgeData;
}

export const BadgesCard = ({ badge }: BadgesCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className="h-full">
      <Card
        onClick={() => setOpenDetails(true)}
        className="group relative h-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-300 transition-all duration-300 hover:-translate-y-2 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-200"
      >
        <SlBadge className="ml-3 mt-3 h-5 w-5 text-amber-600 transition-colors group-hover:text-amber-500" />

        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={badge.badgeImage}
                alt={badge.badgeName}
                width={100}
                height={100}
                className="h-24 w-24 object-contain"
              />
            </div>
          </div>
        </CardContent>
        <div className="mx-auto bg-blue-100 px-4 py-3 transition-colors group-hover:bg-blue-200">
          <h3 className="!line-clamp-2 flex h-10 w-full items-center justify-center break-all text-center text-sm font-semibold text-gray-700 group-hover:text-gray-950">
            {badge.badgeName}
          </h3>
        </div>
      </Card>

      {badge && (
        <DetailsDialog
          isOpen={openDetails}
          onClose={() => setOpenDetails(false)}
          badge={badge}
        />
      )}
    </div>
  );
};
