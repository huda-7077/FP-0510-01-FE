"use client";

import { Card } from "@/components/ui/card";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { Employee } from "@/types/employee";
import RegisterEmployeeButton from "./UpdateEmployeeButton";
import EmployeeProfilePicture from "./EmployeeProfilePicture";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { formatLongDate } = useLongDateFormatter();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-none transition-all duration-300 ease-in-out hover:border-blue-600 md:px-6 md:py-4 lg:pe-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex-shrink-0">
          <EmployeeProfilePicture
            profilePicture={employee.user.profilePicture || ""}
            fullName={employee.user.fullName}
            ringColor="ring-gray-200"
          />
        </div>

        <div className="flex-grow space-y-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold tracking-tight text-gray-900">
                {employee.user.fullName}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-gray-500 sm:gap-2">
              <p className="text-xs font-medium transition-colors group-hover:text-blue-600">
                {employee.position}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              <p className="text-xs text-gray-500">
                Accepted at {formatLongDate(employee.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <RegisterEmployeeButton employee={employee} />
        </div>
      </div>
    </Card>
  );
};
