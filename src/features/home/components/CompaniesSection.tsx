import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

const companies = [
  {
    id: 1,
    name: "Dribbble",
    logo: "/logos/upwork.png",
    location: "United States",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Upwork",
    logo: "/logos/upwork.png",
    location: "United States",
    isFeatured: false,
  },
  {
    id: 3,
    name: "Slack",
    logo: "/logos/upwork.png",
    location: "China",
    isFeatured: false,
  },
  {
    id: 4,
    name: "Freepik",
    logo: "/logos/upwork.png",
    location: "United States",
    isFeatured: false,
  },
  {
    id: 5,
    name: "Dribbble",
    logo: "/logos/upwork.png",
    location: "United States",
    isFeatured: true,
  },
  {
    id: 6,
    name: "Upwork",
    logo: "/logos/upwork.png",
    location: "United States",
    isFeatured: false,
  },
  {
    id: 7,
    name: "Slack",
    logo: "/logos/upwork.png",
    location: "China",
    isFeatured: false,
  },
  {
    id: 8,
    name: "Freepik",
    logo: "/logos/upwork.png",
    location: "United States",
    isFeatured: false,
  },
];

export default function CompaniesSection() {
  return (
    <section className="container mx-auto px-4 py-10 md:px-6 md:pb-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Discover Top Companies
        </h2>
        <Button
          variant="outline"
          className="group self-start rounded-sm font-semibold text-[#0A65CC] shadow-none transition-colors hover:border-blue-50 hover:bg-blue-50 hover:text-blue-600 sm:self-auto"
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {companies.map((company) => (
          <Card
            key={company.id}
            className="group relative overflow-hidden rounded-md border border-gray-200 shadow-none transition-all hover:border-blue-500 hover:shadow-lg hover:ring-1 hover:ring-blue-500"
          >
            <CardContent className="p-4">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{company.name}</h3>
                      {company.isFeatured && (
                        <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-500">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="w-full rounded-md bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                variant="ghost"
              >
                Open Position
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
