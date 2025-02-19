import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SkillAssessment,
  SkillAssessmentStatus,
} from "@/types/skillAssessments";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SkillAssessmentStatusBadge } from "./SkillAssessmentStatusBadge";

interface SkillAssessmentCardProps {
  skillAssessment?: SkillAssessment;
}

export const SkillAssessmentCard = ({
  skillAssessment,
}: SkillAssessmentCardProps) => {
  return (
    <div>
      <Card className="group rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none transition-all duration-200 hover:border-blue-600">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
          {skillAssessment?.badgeImage && (
            <div className="hidden h-20 w-20 flex-shrink-0 items-center justify-center lg:flex">
              <Image
                src={skillAssessment.badgeImage}
                alt="Skill Assessment Badge"
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
              />
            </div>
          )}
          <div className="w-full space-y-2 sm:w-auto">
            <div className="w-full sm:w-auto">
              <h3 className="line-clamp-2 p-0 text-base font-semibold text-gray-900 group-hover:text-blue-600">
                {skillAssessment?.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <p className="line-clamp-3 font-semibold">
                {skillAssessment?.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-bold text-blue-700 sm:px-2 sm:py-1">
                  Passing score: {skillAssessment?.passingScore}
                </span>
                <SkillAssessmentStatusBadge
                  status={
                    skillAssessment?.status
                      ? skillAssessment.status
                      : SkillAssessmentStatus.DRAFT
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4 md:gap-5 lg:w-auto">
            <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4 md:gap-5">
              <Link
                href={`/dashboard/developer/skill-assessments/${skillAssessment?.slug}`}
              >
                <Button
                  variant="outline"
                  className="h-8 flex-1 bg-blue-600 text-xs text-white hover:bg-blue-800 hover:text-white sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
                >
                  <Eye />
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
