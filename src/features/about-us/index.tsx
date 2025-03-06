"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  feature: string;
  featureNumber: number;
  description: string;
  image: string;
}

const quotes = [
  "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
  "The only way to do great work is to love what you do.",
  "If you never give up and you’re willing to suffer enough you can go from quitting to top 100 in the world and winning the tournament.",
];

const photos = [
  "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959592/WhatsApp_Image_2025-03-03_at_6.50.33_AM_etigpj.jpg",
  "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959591/WhatsApp_Image_2025-03-03_at_6.50.32_AM_1_elpqap.jpg",
  "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959591/WhatsApp_Image_2025-03-03_at_6.50.33_AM_1_vmm2pk.jpg",
  "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959590/WhatsApp_Image_2025-03-03_at_6.50.32_AM_qa0c5b.jpg",
  "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959591/WhatsApp_Image_2025-03-03_at_6.50.35_AM_nw3pkr.jpg",
  "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959591/WhatsApp_Image_2025-03-03_at_6.50.34_AM_hravg9.jpg",
];

const teamMembers: TeamMember[] = [
  {
    name: "Calvin",
    role: "Full Stack Developer",
    feature:
      "User Authentication, Profile, Job Discovery & Social Media Sharing",
    featureNumber: 1,
    description:
      "Leading the development of our core user features, Calvin brought to life the essential interfaces that connect job seekers with opportunities. His commitment to creating seamless user experiences has been fundamental to our platform's success.",
    image:
      "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740961967/91A49ED0-4F03-450B-BC20-BB5AF27943C4_1_105_c_ui5cqi.jpg",
  },
  {
    name: "Ega",
    role: "Full Stack Developer",
    feature: "Job Posting Management, Pre-Selection Tests & Website Analytics",
    featureNumber: 2,
    description:
      "Ega's technical expertise powers the sophisticated systems behind our platform. His innovative approach to company dashboards and applicant management tools has transformed how businesses find their perfect candidates.",
    image:
      "https://res.cloudinary.com/dwptrdpk0/image/upload/v1741181614/photo_6078148945076402397_y_edited_wks9wr.jpg",
  },
  {
    name: "Huda",
    role: "Full Stack Developer",
    feature: "Account Subscription, CV Generator & Skill Assessment",
    featureNumber: 3,
    description:
      "Huda bridged the gap between ideas and implementation with his full-stack capabilities. His work on premium features and assessment tools has elevated our platform, providing unique value to both job seekers and employers alike.",
    image:
      "https://res.cloudinary.com/dwptrdpk0/image/upload/v1740959961/WhatsApp_Image_2025-03-03_at_6.41.55_AM_xeezr7.jpg", // Replace with actual image path
  },
];

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="sticky z-50 w-full p-6">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="logo"
                width={116}
                height={30}
                className="mx-auto"
              />
            </Link>
          </div>
          <div className="absolute inset-0 bg-blue-900"></div>
        </div>
        <div className="container z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              Meet Our Team
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white md:text-2xl">
              We're builders, dreamers, and problem-solvers ready to work
              alongside you, turning your vision into reality.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex justify-center">
                <div className="mt-8 w-fit rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Our Story
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 flex w-full transform animate-bounce justify-center text-white">
          <ArrowDown className="h-10 w-10" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
              Our Story
            </h2>
            <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mb-20 items-center gap-10 md:flex">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <Image
                src="/jcwd0510.jpg"
                alt="Our journey"
                width={600}
                height={400}
                className="h-[400px] w-full rounded-lg object-cover shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
                From Idea to Reality
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                What began as a final project has grown into our life's passion.
                We've poured our hearts, sweat, and tears in working on this
                project, driven by our shared vision to revolutionize how people
                find their dream careers and how companies discover perfect
                talent.
              </p>
              <p className="leading-relaxed text-gray-600">
                Every feature, every line of code, and every design element
                represents countless hours of collaboration, problem-solving,
                and dedication. We're immensely proud to have reached this
                milestone, but our journey is just beginning. We're committed to
                continually improving and expanding to be the best that we can.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mb-20 rounded-xl bg-blue-600 p-10 text-center text-white shadow-lg md:p-16">
            <svg
              className="mx-auto mb-6 h-12 w-12 text-blue-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h3 className="mb-6 text-2xl font-bold md:text-3xl">{quotes[0]}</h3>
            <p className="text-lg text-blue-100">- Pelé</p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              The Journey
            </h2>
            <div className="mx-auto mb-10 h-1 w-20 bg-blue-600"></div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {photos.map((item) => (
                <div
                  key={item}
                  className="group relative h-64 overflow-hidden rounded-lg shadow-md"
                >
                  <Image
                    src={item}
                    alt="Team working"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xl font-semibold text-white">
                      Building Together
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
                Meet The Founders
              </h2>
              <div className="mx-auto h-1 w-20 bg-blue-600"></div>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <FadeInWhenVisible key={member.name}>
                <Card className="overflow-hidden border-none shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <div className="relative h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-4">
                      <span className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                        Feature {member.featureNumber}
                      </span>
                      <h3 className="text-2xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-blue-100">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-semibold text-blue-800">
                      {member.feature}
                    </h4>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Cards */}
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((quote, index) => (
            <FadeInWhenVisible key={index}>
              <div className="rounded-lg border-t-4 border-blue-600 bg-white p-8 shadow-lg">
                <svg
                  className="mb-4 h-8 w-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mb-4 font-medium text-gray-700">{quote}</p>
                <div className="mb-4 h-0.5 w-12 bg-blue-600"></div>
                <p className="text-sm text-gray-500">
                  -{" "}
                  {index === 0
                    ? "Pelé"
                    : index === 1
                      ? "Steve Jobs"
                      : "Sykkuno"}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Join Us on Our Journey
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
              We're just getting started, and we'd love for you to be part of
              our story.
            </p>
            <Link href="/contact">
              <button className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                Contact Us
              </button>
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
