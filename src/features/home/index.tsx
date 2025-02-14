import Footer from "@/components/Footer";
import DiscoverySection from "./components/DiscoverySection";
import HeroSection from "./components/HeroSection";
import SupajobWorkflow from "./components/SupajobWorkflow";
import CallToActionSection from "./components/CallToActionSection";
import CompaniesSection from "./components/CompaniesSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <DiscoverySection />
      <CompaniesSection />
      <SupajobWorkflow />
      <CallToActionSection />
      <Footer />
    </main>
  );
};

export default HomePage;
