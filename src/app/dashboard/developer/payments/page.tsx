import { PaymentListComponent } from "@/features/developer/payments";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const PaymentList = () => {
  return <PaymentListComponent />;
};

export default DeveloperAuthGuard(PaymentList);
