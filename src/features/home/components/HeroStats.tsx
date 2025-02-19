'use client';

import { Briefcase, Building2, Users } from "lucide-react";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  label: string;
  isBlue?: boolean;
}

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US');
};

const StatCard = ({
  icon: Icon,
  number,
  label,
  isBlue = false,
}: StatCardProps) => (
  <div className="flex items-center gap-3 rounded-sm bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl sm:gap-4 sm:p-6">
    <div
      className={`flex-shrink-0 rounded-sm p-3 ${
        isBlue ? "bg-blue-600" : "bg-blue-50"
      }`}
    >
      <Icon
        className={`h-5 w-5 sm:h-6 sm:w-6 ${
          isBlue ? "text-white" : "text-blue-600"
        }`}
      />
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
  const stats = [
    {
      icon: Briefcase,
      number: 175324,
      label: "Live Job",
    },
    {
      icon: Building2,
      number: 97354,
      label: "Companies",
      isBlue: true,
    },
    {
      icon: Users,
      number: 3847154,
      label: "Candidates",
    },
    {
      icon: Briefcase,
      number: 7532,
      label: "New Jobs",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
            isBlue={stat.isBlue}
          />
        ))}
      </div>
    </div>
  );
};

export default JobStats;