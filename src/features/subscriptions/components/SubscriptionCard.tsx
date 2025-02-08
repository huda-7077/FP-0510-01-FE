"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useGetSubscriptionCategories from "@/hooks/api/subscription-categories/useGetSubscriptionCategories";
import { SubscriptionCategory } from "@/types/subscription";
import { Check } from "lucide-react";
import { useState } from "react";
import { CheckoutDialog } from "./CheckoutDialog";

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

const SubscriptionCard = () => {
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
    return <LoadingScreen message="Loading subscription plans" />;
  }

  return (
    <div>
      <div className={`grid gap-8 md:grid-cols-2`}>
        {subscriptionCategories?.map((category) => (
          <Card
            key={category.id}
            className={`relative transform transition-all duration-300 hover:shadow-lg ${
              category.name === "PROFESSIONAL"
                ? "border-2 border-blue-600 shadow-md"
                : "border border-gray-200"
            }`}
          >
            {category.name === "PROFESSIONAL" && (
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
                  <span className="text-4xl font-bold text-blue-600">
                    Rp {category.price.toLocaleString("id-ID")}
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
                  category.name === "PROFESSIONAL"
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

      {selectedPlan && (
        <CheckoutDialog
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          categoryName={selectedPlan.name}
          basePrice={selectedPlan.price}
        />
      )}
    </div>
  );
};

export default SubscriptionCard;
