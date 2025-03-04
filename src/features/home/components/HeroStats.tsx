"use client";
import useGetOverview from "@/hooks/api/overview/useGetOverview";
import { Briefcase, Building2, Users } from "lucide-react";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  label: string;
  isBlue?: boolean;
}

const formatNumber = (num: number) => {
  return num.toLocaleString("en-US");
};

const StatCard = ({ icon: Icon, number, label }: StatCardProps) => (
  <div className="group flex items-center gap-3 rounded-sm bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl sm:gap-4 sm:p-6">
    <div className="flex-shrink-0 rounded-sm bg-blue-50 p-3 transition-all duration-300 group-hover:bg-blue-600">
      <Icon className="h-5 w-5 text-blue-600 transition-all duration-300 group-hover:text-white sm:h-6 sm:w-6" />
    </div>
    <div>
      <div className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
        {formatNumber(number)}
      </div>
      <div className="text-xs text-gray-500 sm:text-sm">{label}</div>
    </div>
  </div>
);

const JobStats = () => {
  const { data, isLoading } = useGetOverview();

  const stats = [
    {
      icon: Briefcase,
      number: isLoading ? 0 : data?.liveJobs || 0,
      label: "Live Job",
    },
    {
      icon: Building2,
      number: isLoading ? 0 : data?.companies || 0,
      label: "Companies",
    },
    {
      icon: Users,
      number: isLoading ? 0 : data?.candidates || 0,
      label: "Candidates",
    },
    {
      icon: Briefcase,
      number: isLoading ? 0 : data?.newJobs || 0,
      label: "New Jobs",
    },
  ];

  return (
    <div className="container mx-auto w-full">
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  );
};

export default JobStats;
