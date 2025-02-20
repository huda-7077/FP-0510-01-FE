import Image from "next/image";
import HeroSearchBar from "./HeroSearchBar";
import JobStats from "./HeroStats";

const HeroSection = () => {
  return (
    <section className="bg-[#f7f7f8] text-sm">
      <div className="container mx-auto px-4 py-6 md:py-20 lg:px-4 xl:px-8">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900 md:text-5xl">
              Find a job that suits your interest & skills
            </h1>
            <h2 className="text-gray-600">
              Discover a wide range of job opportunities designed to match your
              skills and passions. Whether you're a seasoned professional or
              just starting your career, there's a perfect role waiting for you.
            </h2>
            <div className="space-y-4">
              <HeroSearchBar />
              <p className="text-xs text-gray-500">
                Suggestion: Designer, Programming, Digital Marketing, Video,
                Animation
              </p>
            </div>
          </div>
          <div className="order-first flex w-full items-center justify-center md:order-last">
            <div className="relative h-40 w-full md:h-64">
              <Image
                src="/hero-illustration.png"
                alt="HeroIllustration"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-10">
          <JobStats />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
