import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CompanyPage from "@/features/company";

const OpenJobsPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Navbar />
      <CompanyPage companyId={parseInt(params.id)} />
      <Footer />
    </>
  );
};

export default OpenJobsPage;
