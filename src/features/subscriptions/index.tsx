"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckoutDialog } from "./components/CheckoutDialog";
import useGetSubscriptionCategories from "@/hooks/api/subscription/useGetSubscriptionCategories";
import { SubscriptionCategory } from "@/types/subscription";

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="rounded-full bg-blue-100 p-1">
        <Check className="h-4 w-4 text-blue-600" />
      </div>
      <span className="text-gray-600">{text}</span>
    </li>
  );
}

const SubscriptionPage = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionCategory | null>(
    null,
  );
  const { data: subscriptionCategories, isLoading } =
    useGetSubscriptionCategories();

  const handlePlanSelection = (plan: SubscriptionCategory) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Determine grid columns based on the number of subscription categories
  const gridColsClass =
    subscriptionCategories && subscriptionCategories.length > 3
      ? "md:grid-cols-3"
      : "md:grid-cols-2";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
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

        {/* Pricing Cards */}
        <div className={`grid gap-8 ${gridColsClass}`}>
          {subscriptionCategories?.map((category) => (
            <Card
              key={category.id}
              className={`relative transform transition-all duration-300 hover:shadow-lg ${
                category.name === "STANDARD"
                  ? "border-2 border-blue-600 shadow-md"
                  : "border border-gray-200"
              }`}
            >
              {category.name === "STANDARD" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-6 py-1.5 text-sm font-medium text-white shadow-sm">
                    Recommendation
                  </span>
                </div>
              )}
              <CardHeader className="space-y-2 pt-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-blue-600">
                      ${Math.floor(category.price / 1000)}
                    </span>
                    <span className="ml-2 text-gray-500">/Monthly</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {category.features.map((feature, index) => (
                    <Feature key={index} text={feature} />
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  className={`w-full transform transition-all duration-300 ${
                    category.name === "STANDARD"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => handlePlanSelection(category)}
                >
                  Choose Plan
                  <span className="ml-2">→</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Checkout Dialog */}
        {selectedPlan && (
          <CheckoutDialog
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            categoryName={selectedPlan.name}
            basePrice={selectedPlan.price}
          />
        )}

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-gray-500">
          © 2024 Job Board. All rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionPage;
