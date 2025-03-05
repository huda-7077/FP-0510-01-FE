import InvoicePage from "@/features/invoice";

const Invoice = ({ params }: { params: { uuid: string } }) => {
  return <InvoicePage uuid={params.uuid} />;
};

export default Invoice;
