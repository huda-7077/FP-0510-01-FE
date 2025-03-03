"use client";

import Footer from "@/components/Footer";
import DiscoverySection from "./components/DiscoverySection";
import HeroSection from "./components/HeroSection";
import SupajobWorkflow from "./components/SupajobWorkflow";
import CallToActionSection from "./components/CallToActionSection";
import CompaniesSection from "./components/CompaniesSection";
import TestimonialSection from "./components/TestimonialSection";
import SubscriptionSection from "./components/SubscriptionSection";
import PopularCategorySection from "./components/PopularCategories";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <PopularCategorySection />
      <DiscoverySection />
      <CompaniesSection />
      <SupajobWorkflow />
      <CallToActionSection />
      <TestimonialSection />
      <SubscriptionSection />
      <Footer />
    </main>
  );
};

export default HomePage;
