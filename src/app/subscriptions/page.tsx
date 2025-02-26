import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SubscriptionPage from "@/features/subscriptions";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const Subscriptions = () => {
  return (
    <>
      <Navbar />
      <SubscriptionPage />
      <Footer />
    </>
  );
};

export default UserAuthGuard(Subscriptions);
