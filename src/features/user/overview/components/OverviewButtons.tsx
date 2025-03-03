import { Bookmark, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

interface OverviewButtonsProps {
  totalApplications: number;
  totalFavorites: number;
  isLoading: boolean;
}

const OverviewButtons = ({ 
  totalApplications = 0, 
  totalFavorites = 0,
  isLoading = false 
}: OverviewButtonsProps) => {
  return (
    <div className="grid grid-cols-1 justify-between gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
      <Link href="/dashboard/user/jobs">
        <div className="flex items-center justify-between gap-9 rounded-md bg-blue-200 p-4 duration-150 hover:shadow-lg">
          <div>
            <h2 className="text-xl font-semibold">
              {isLoading ? "..." : totalApplications}
            </h2>
            <p className="text-sm text-gray-700">Applied jobs</p>
          </div>
          <div className="rounded-md bg-white p-4 text-blue-500">
            <BriefcaseBusiness />
          </div>
        </div>
      </Link>

      <Link href="/dashboard/user/saved-jobs">
        <div className="flex items-center justify-between gap-9 rounded-md bg-yellow-100 p-4 duration-150 hover:shadow-lg">
          <div>
            <h2 className="text-xl font-semibold">
              {isLoading ? "..." : totalFavorites}
            </h2>
            <p className="text-sm text-gray-700">Favorite jobs</p>
          </div>
          <div className="rounded-md bg-white p-4 text-yellow-500">
            <Bookmark />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OverviewButtons;