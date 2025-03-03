import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import InvoicePage from "@/features/invoice";

const Invoice = ({ params }: { params: { uuid: string } }) => {
  return (
    <>
      <Navbar />
      <InvoicePage uuid={params.uuid} />
      <Footer />
    </>
  );
};

export default Invoice;
