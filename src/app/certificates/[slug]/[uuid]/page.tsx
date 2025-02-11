import CertificatePage from "@/features/certificate";
interface PageProps {
  params: {
    slug: string;
    uuid: string;
  };
}
const Certificate = ({ params }: PageProps) => {
  return <CertificatePage slug={params.slug} uuid={params.uuid} />;
};

export default Certificate;
