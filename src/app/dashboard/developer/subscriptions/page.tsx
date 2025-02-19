import { SubscriptionListComponent } from "@/features/developer/subscriptions";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const SubscriptionList = () => {
  return <SubscriptionListComponent />;
};

export default DeveloperAuthGuard(SubscriptionList);
