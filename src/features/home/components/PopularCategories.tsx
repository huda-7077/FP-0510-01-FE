import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookCopy,
  BusFront,
  Code,
  Database,
  Heart,
  Landmark,
  PencilRuler,
  Tv,
} from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

type CategoryItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  categoryValue: string;
};

const PopularCategorySection = () => {
  const categories: CategoryItem[] = [
    {
      id: "graphics-design",
      title: "Information Technology (IT) & Software Development",
      icon: <Code size={24} />,
      categoryValue: "Information Technology & Software Development",
    },
    {
      id: "business-management",
      title: "Business & Management",
      icon: <Database size={24} />,
      categoryValue: "Business & Management",
    },
    {
      id: "engineering",
      title: "Engineering",
      icon: <PencilRuler size={24} />,
      categoryValue: "Engineering",
    },
    {
      id: "healthcare-medical",
      title: "Healthcare & Medical",
      icon: <Heart size={24} />,
      categoryValue: "Healthcare & Medical",
    },
    {
      id: "education-training",
      title: "Education & Training",
      icon: <BookCopy size={24} />,
      categoryValue: "Education & Training",
    },
    {
      id: "government-public",
      title: "Government & Public Administration",
      icon: <Landmark size={24} />,
      categoryValue: "Government & Public Administration",
    },
    {
      id: "transportation-warehousing",
      title: "Transportation & Warehousing",
      icon: <BusFront size={24} />,
      categoryValue: "Transportation & Warehousing",
    },
    {
      id: "media-communications",
      title: "Media & Communications",
      icon: <Tv size={24} />,
      categoryValue: "Media & Communications",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold sm:text-2xl">Popular category</h2>
        <Link href="/jobs">
          <Button
            variant="outline"
            className="group self-start rounded-sm font-semibold text-[#0A65CC] shadow-none transition-colors hover:border-blue-50 hover:bg-blue-50 hover:text-blue-600 sm:self-auto"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 text-sm text-blue-400 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/jobs?category=${encodeURIComponent(category.categoryValue)}`}
          >
            <div className="flex items-center rounded-lg p-4 transition-transform hover:scale-105">
              <div className="rounded-lg p-3">{category.icon}</div>
              <div className="ml-4">
                <h3 className="line-clamp-2 font-medium text-gray-700">
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategorySection;
