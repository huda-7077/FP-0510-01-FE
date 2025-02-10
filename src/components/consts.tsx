import {
  BellRing,
  Bookmark,
  BriefcaseBusiness,
  Building,
  Clock,
  FileStack,
  Layers,
  Luggage,
  PencilLine,
  Settings,
} from "lucide-react";

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
  {
    name: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export const userSidebarLinks = [
  {
    name: "Overview",
    url: "/dashboard/user/overview",
    icon: Layers,
  },
  {
    name: "Applied Jobs",
    url: "/dashboard/user/apply-jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Favorite Jobs",
    url: "/dashboard/user/apply-jobs",
    icon: Bookmark,
  },
  {
    name: "Job Alerts",
    url: "/dashboard/user/job-alerts",
    icon: BellRing,
  },
  {
    name: "Create CV",
    url: "/dashboard/user/cv-generator",
    icon: PencilLine,
  },
  {
    name: "Settings",
    url: "/dashboard/user/settings",
    icon: Settings,
  },
];
