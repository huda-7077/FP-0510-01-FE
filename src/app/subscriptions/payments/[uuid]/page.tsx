import PaymentPage from "@/features/subscriptions/payments";

const Payments = ({ params }: { params: { uuid: string } }) => {
  return <PaymentPage uuid={params.uuid} />;
};

export default Payments;
