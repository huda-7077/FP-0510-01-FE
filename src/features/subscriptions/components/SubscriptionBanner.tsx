"use client";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionBanner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Buy Premium Subscription to Post a Job
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Select the perfect plan for your hiring needs. Choose between our
            Basic, Standard, and Premium plans with flexible options to match
            your requirements.
          </p>
        </div>

        <SubscriptionCard />

        <footer className="mt-24 text-center text-sm text-gray-500">
          © 2024 Job Board. All rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
