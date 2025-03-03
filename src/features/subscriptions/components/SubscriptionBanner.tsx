import { FC } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { Link } from "next-view-transitions";

const SubscriptionBanner: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div>
      <div>
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Buy Premium Subscription to Get More Features
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Select the perfect plan for your needs and unlock a world of
            exceptional features. Your success is our priority. Subscribe now
            and take your career to the next level.
          </p>
        </div>

        <SubscriptionCard isActive={isActive} />
      </div>
      {isActive && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:space-x-4">
          <p className="text-lg font-medium text-gray-500">
            Currently you have an active subscription
          </p>

          <Link
            href="/dashboard/user/subscriptions"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubscriptionBanner;
