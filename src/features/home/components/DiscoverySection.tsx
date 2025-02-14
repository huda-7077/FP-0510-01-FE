import { Button } from "@/components/ui/button";
import {
  Bookmark,
  MapPin,
  DollarSign,
  ArrowRight,
  MapPinCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample jobs data
const jobs = [
  {
    id: 1,
    title: "Senior UX Designer",
    company: "Upwork",
    logo: "/logos/upwork.png",
    location: "Australia",
    salary: "$30K-$35K",
    type: "Contract Base",
    daysRemaining: 4,
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Apple",
    logo: "/logos/apple.png",
    location: "China",
    salary: "$50K-$60K",
    type: "Full Time",
    daysRemaining: 4,
  },
  {
    id: 3,
    title: "Junior Graphic Designer",
    company: "Figma",
    logo: "/logos/figma.png",
    location: "Canada",
    salary: "$50K-$70K",
    type: "Full Time",
    daysRemaining: 4,
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Apple",
    logo: "/logos/apple.png",
    location: "China",
    salary: "$50K-$60K",
    type: "Full Time",
    daysRemaining: 4,
  },
  {
    id: 5,
    title: "Junior Graphic Designer",
    company: "Figma",
    logo: "/logos/figma.png",
    location: "Canada",
    salary: "$50K-$70K",
    type: "Full Time",
    daysRemaining: 4,
  },
];

export default function DiscoverySection() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold sm:text-2xl">Jobs Near You</h2>
          <div className="flex items-center gap-2 text-[#0A65CC]">
            <MapPin className="h-5 sm:h-6" />
            Your Location
          </div>
        </div>
        <Button
          variant="outline"
          className="group self-start rounded-sm font-semibold text-[#0A65CC] shadow-none transition-colors hover:border-blue-50 hover:bg-blue-50 hover:text-blue-600 sm:self-auto"
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col gap-4 rounded-lg border p-4 transition-all hover:border-blue-400 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={job.logo}
                alt={job.company}
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <h3 className="text-lg font-medium text-blue-600">
                  {job.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                  <span>{job.daysRemaining} Days Remaining</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <Bookmark className="cursor-pointer text-blue-300 hover:text-blue-600" />
              <Button
                asChild
                className="rounded-sm bg-blue-50 px-6 text-blue-600 shadow-none hover:bg-blue-600 hover:text-blue-50"
              >
                <Link href="#">Apply Now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
