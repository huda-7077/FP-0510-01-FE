import PaymentPage from "@/features/subscriptions/payments";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const Payments = ({ params }: { params: { uuid: string } }) => {
  return <PaymentPage uuid={params.uuid} />;
};

export default UserAuthGuard(Payments);
