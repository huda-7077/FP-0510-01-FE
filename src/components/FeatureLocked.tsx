"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTransitionRouter } from "next-view-transitions";

interface FeatureLockedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  isDashboard?: boolean;
}

export const FeatureLocked: React.FC<FeatureLockedProps> = ({
  title = "Feature Locked",
  description = "This feature is not available. Please subscribe to access this feature.",
  buttonText = "Subscribe Now",
  isDashboard = false,
}) => {
  const router = useTransitionRouter();

  const handleSubscribe = () => {
    router.push("/subscriptions");
  };

  return (
    <div
      className={
        isDashboard
          ? "flex items-center justify-center py-24"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      }
    >
      <Card className="w-full max-w-md rounded-2xl bg-red-50 shadow-lg">
        <CardContent className="p-8 text-center">
          <CardTitle className="text-2xl font-bold text-red-600">
            {title}
          </CardTitle>
          <p className="mt-4 text-sm text-red-500">{description}</p>
          <Button
            onClick={handleSubscribe}
            className="mt-6 w-full bg-red-600 py-3 text-lg font-semibold text-white hover:bg-red-700"
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureLocked;
