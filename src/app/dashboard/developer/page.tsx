import DeveloperOverviewPage from "@/features/developer/overview";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const Developer = () => {
  return <DeveloperOverviewPage />;
};

export default DeveloperAuthGuard(Developer);
