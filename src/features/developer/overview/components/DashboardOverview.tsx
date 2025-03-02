import { DeveloperOverview } from "@/types/overview";
import {
  FaBriefcase,
  FaBuilding,
  FaCheck,
  FaMoneyBill,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import OverviewCard from "./OverviewCard";
import { FC } from "react";

interface OverviewProps {
  data: DeveloperOverview;
}

const DashboardOverview: FC<OverviewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        title="Total Users"
        value={data.totalUsers}
        icon={<FaUser />}
        bgColor="bg-blue-500"
      />
      <OverviewCard
        title="Verified Users"
        value={data.verifiedUsers}
        icon={<FaCheck />}
        bgColor="bg-green-500"
      />
      <OverviewCard
        title="Total Subscriptions"
        value={data.totalSubscriptions}
        icon={<FaMoneyBill />}
        bgColor="bg-yellow-500"
      />
      <OverviewCard
        title="Active Subscriptions"
        value={data.activeSubscriptions}
        icon={<FaMoneyBill />}
        bgColor="bg-yellow-700"
      />
      <OverviewCard
        title="Total Jobs Published"
        value={data.totalJobsPublished}
        icon={<FaBriefcase />}
        bgColor="bg-purple-500"
      />
      <OverviewCard
        title="Total Companies"
        value={data.totalCompanies}
        icon={<FaBuilding />}
        bgColor="bg-indigo-500"
      />
      <OverviewCard
        title="Skill Assessments"
        value={data.totalSkillAssessmentsPublished}
        icon={<FaTasks />}
        bgColor="bg-red-500"
      />
      <OverviewCard
        title="Paid Payments"
        value={data.totalPaidPayments}
        icon={<FaMoneyBill />}
        bgColor="bg-teal-500"
      />
    </div>
  );
};

export default DashboardOverview;
