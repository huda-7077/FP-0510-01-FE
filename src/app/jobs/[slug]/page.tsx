import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import JobPage from "@/features/job";

const Job = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <Navbar />
      <JobPage slug={params.slug} />
      <Footer />
    </>
  );
};

export default Job;
