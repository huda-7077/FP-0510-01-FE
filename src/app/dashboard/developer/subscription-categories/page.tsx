import SubscriptionCategoriesPage from "@/features/developer/subscription-categories";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const SubscriptionCategories = () => {
  return <SubscriptionCategoriesPage />;
};

export default DeveloperAuthGuard(SubscriptionCategories);
