import { Building, Clock, FileStack, Luggage, User } from "lucide-react";

export const adminSidebarLinks = [
  {
    name: "Overview",
    url: "/dashboard/admin/overview",
    icon: FileStack,
  },
  {
    name: "Company Details",
    url: "/dashboard/admin/company-details",
    icon: Building,
  },
  {
    name: "My Jobs",
    url: "/dashboard/admin/jobs",
    icon: Luggage,
  },
  {
    name: "Interview Schedules",
    url: "/dashboard/admin/interview-schedules",
    icon: Clock,
  },
];
