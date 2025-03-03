import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetSubscriptionCategories from "@/hooks/api/subscription-categories/useGetSubscriptionCategories";
import { Check, Gem, Package } from "lucide-react";
import { Link } from "next-view-transitions";

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

const SubscriptionSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="flex min-h-[450px] flex-col">
        <CardHeader className="space-y-2 pt-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
          <div>
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const NoDataFound = () => (
  <div className="mx-auto max-w-2xl space-y-6 text-center">
    <Alert variant="default" className="border-2 border-blue-100 bg-blue-50/50">
      <div className="relative mx-auto w-fit">
        <div className="relative rounded-full bg-blue-50 p-8">
          <Package className="h-12 w-12 text-blue-600" />
        </div>
      </div>
      <AlertTitle className="text-lg font-semibold text-blue-900">
        No Subscription Plans Available
      </AlertTitle>
      <AlertDescription className="mt-3 text-blue-800">
        We couldn't find any subscription plans at the moment. This could be due
        to temporary maintenance or connectivity issues.
      </AlertDescription>
    </Alert>
  </div>
);

const SubscriptionCard = () => {
  const { data: subscriptionCategories, isLoading } =
    useGetSubscriptionCategories();

  const getGridClassName = (categoriesCount: number) => {
    if (categoriesCount === 1)
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:place-items-center";
    if (categoriesCount === 2)
      return "grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24";
    return "grid-cols-1 md:grid-cols-3";
  };

  return (
    <section className="container mx-auto space-y-9 p-4 px-4 py-24 md:p-8 lg:p-10 xl:px-8">
      <div className="space-y-5 text-center">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Choose Your Perfect Plan!
        </h1>
        <p className="text-sm text-gray-700 md:text-base">
          At Supajob, we offer a range of subscription plans to suit your hiring
          or job-searching needs. Whether you're an individual seeking the best
          talent or a job seeker looking for your next big opportunity, we've
          got you covered!
        </p>
      </div>

      {isLoading ? (
        <SubscriptionSkeleton />
      ) : !subscriptionCategories?.length ? (
        <NoDataFound />
      ) : (
        <>
          <div
            className={`grid gap-6 ${getGridClassName(subscriptionCategories.length)}`}
          >
            {subscriptionCategories.length === 1 ? (
              <div className="col-span-1 w-full md:col-span-1 md:col-start-2">
                {subscriptionCategories.map((category) => (
                  <Card
                    key={category.id}
                    className={`relative transform transition-all duration-300 hover:shadow-lg ${
                      category.name === "PROFESSIONAL"
                        ? "border-2 border-blue-600 shadow-md"
                        : "border border-gray-200"
                    } flex min-h-[450px] flex-col`}
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
                      <p className="text-sm text-gray-500">
                        {category.description}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow pt-6">
                      <div className="mb-8">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-blue-600">
                            Rp{category.price.toLocaleString("id-ID")}
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
                  </Card>
                ))}
              </div>
            ) : (
              subscriptionCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`relative transform transition-all duration-300 hover:shadow-lg ${
                    category.name === "PROFESSIONAL"
                      ? "border-2 border-blue-600 shadow-md"
                      : "border border-gray-200"
                  } flex min-h-[450px] flex-col`}
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
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow pt-6">
                    <div className="mb-8">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-blue-600">
                          Rp{category.price.toLocaleString("id-ID")}
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
                </Card>
              ))
            )}
          </div>

          <Link
            href="/subscriptions"
            className="flex items-center justify-center"
          >
            <Button className="group w-fit transform bg-blue-600 p-6 text-xl font-semibold text-white transition-all duration-300 hover:bg-blue-700">
              <Gem className="mr-2 h-6 w-6 transition-transform group-hover:scale-110" />
              Get Started
            </Button>
          </Link>
        </>
      )}
    </section>
  );
};

export default SubscriptionCard;
