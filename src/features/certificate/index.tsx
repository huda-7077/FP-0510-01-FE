"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetCertificate from "@/hooks/api/certificate/useGetCertificate";
import dynamic from "next/dynamic";
import { FC } from "react";
import CertificateView from "./components/CertificateView";

const DownloadAndShareSection = dynamic(
  () => import("./components/DownloadAndShareSection"),
  {
    ssr: false,
  },
);

interface CertificatePageProps {
  uuid: string;
  slug: string;
}

const CertificatePage: FC<CertificatePageProps> = ({ slug, uuid }) => {
  const { data: certificate, isLoading } = useGetCertificate({ uuid, slug });

  if (isLoading) {
    return <LoadingScreen message="Loading certificate" />;
  }

  return (
    <>
      {certificate ? (
        <div>
          <CertificateView certificate={certificate} />
          <DownloadAndShareSection certificate={certificate} />
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          Certificate Not Found
        </div>
      )}
    </>
  );
};

export default CertificatePage;
