"use client";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { FeatureLocked } from "@/components/FeatureLocked";
import useGetSubscription from "@/hooks/api/subscription/useGetSubscription";
import dynamic from "next/dynamic";
import CVFormSkeleton from "./components/CVFormSkeleton";

const CVGenerator = dynamic(() => import("./components/CVGenerator"), {
  ssr: false,
});

const CVGeneratorPage = () => {
  const { data: subscription, isLoading } = useGetSubscription({
    enabled: true,
  });

  if (isLoading) {
    return (
      <>
        <DashboardBreadcrumb route="user" lastCrumb="CV Generator" />
        <CVFormSkeleton />
      </>
    );
  }
  return (
    <>
      <DashboardBreadcrumb route="user" lastCrumb="CV Generator" />

      {subscription &&
      (subscription.status === "ACTIVE" || subscription.status === "MAILED") ? (
        <CVGenerator />
      ) : (
        <FeatureLocked isDashboard={true} />
      )}
    </>
  );
};

export default CVGeneratorPage;
