import SubscriptionCard from "./SubscriptionCard";

const SubscriptionBanner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Buy Premium Subscription to Get More Features
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Select the perfect plan for your needs and unlock a world of
            exceptional features. Your success is our priority. Subscribe now
            and take your career to the next level.
          </p>
        </div>

        <SubscriptionCard />
      </div>
    </div>
  );
};

export default SubscriptionBanner;
