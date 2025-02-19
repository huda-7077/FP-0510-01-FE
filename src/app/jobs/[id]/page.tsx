import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import JobPage from "@/features/job";

const Job = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Navbar />
      <JobPage jobId={parseInt(params.id)} />
      <Footer />
    </>
  );
};

export default Job;
