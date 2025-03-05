import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Jay Park",
    role: "UI/UX Designer",
    avatar: "/testi-guy.jpg",
    content:
      "This platform made my job search so much easier! I found the perfect role within weeks, and the application process was seamless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Lalisa Manoban",
    role: "Creative Director",
    avatar: "/testi2.jpg",
    content:
      "We hired an incredible designer through this job board. The quality of candidates and the easy hiring process saved us so much time!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jennie Kim",
    role: "Photographer",
    avatar: "/testi3.webp",
    content:
      "As a freelancer, I found amazing job opportunities here. The platform connects me with clients who truly value my skills.",
    rating: 5,
  },
  {
    id: 4,
    name: "Jaehyun Jeong",
    role: "Marketing Director",
    avatar: "/testi4.jpg",
    content:
      "The job board helped us find top talent quickly. The filtering options and candidate profiles made recruitment a breeze!",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#f7f7f8] py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900 md:mb-12 md:text-4xl">
          Clients Testimonial
        </h2>

        <div className="relative mx-auto max-w-6xl">
          {/* Navigation Buttons - Desktop only */}
          <button
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
              )
            }
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={() =>
              setActiveIndex((prev) =>
                prev === testimonials.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <Card className="mx-auto max-w-2xl border-none bg-transparent shadow-none">
                    <CardContent className="relative p-6 text-center">
                      {/* Quote mark */}
                      <div className="absolute -right-2 top-0 text-4xl text-blue-500 opacity-50 md:-right-4 md:text-6xl">
                        "
                      </div>

                      {/* Rating */}
                      <div className="mb-4 flex justify-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400 md:h-5 md:w-5"
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="mb-6 text-sm text-gray-600 md:text-base">
                        {testimonial.content}
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-center space-x-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full md:h-12 md:w-12">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-semibold text-gray-900 md:text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-gray-500 md:text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all md:h-2",
                  activeIndex === index
                    ? "w-4 bg-blue-600 md:w-6"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400 md:w-2"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}