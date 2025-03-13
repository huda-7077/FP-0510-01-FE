import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CompanyPage from "@/features/company";

const ReviewsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <Navbar />
      <CompanyPage slug={params.slug}/>
      <Footer />
    </>
  );
};

export default ReviewsPage;