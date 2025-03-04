import {
  Award,
  Bookmark,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock,
  CreditCard,
  FileStack,
  HandCoins,
  Layers,
  Luggage,
  PanelsTopLeft,
  PencilLine,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";

export const adminSidebarLinks = [
  {
    name: "Overview",
    url: "/dashboard/admin/overview",
    icon: FileStack,
  },
  {
    name: "My Jobs",
    url: "/dashboard/admin/jobs",
    icon: Luggage,
  },
  {
    name: "Interview Schedules",
    url: "/dashboard/admin/interviews",
    icon: Clock,
  },
  {
    name: "Employees",
    url: "/dashboard/admin/employee",
    icon: Users,
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
    url: "/dashboard/user/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Favorite Jobs",
    url: "/dashboard/user/saved-jobs",
    icon: Bookmark,
  },
  {
    name: "Badges",
    url: "/dashboard/user/badges",
    icon: Award,
  },
  {
    name: "Create CV",
    url: "/dashboard/user/cv-generator",
    icon: PencilLine,
  },
  {
    name: "Subscriptions",
    url: "/dashboard/user/subscriptions",
    icon: CreditCard,
  },
  {
    name: "Payments",
    url: "/dashboard/user/payments",
    icon: HandCoins,
  },
  {
    name: "Settings",
    url: "/dashboard/user/settings",
    icon: Settings,
  },
];

export const developerSidebarLinks = [
  {
    name: "Overview",
    url: "/dashboard/developer",
    icon: PanelsTopLeft,
  },
  {
    name: "Subscriptions",
    url: "/dashboard/developer/subscriptions",
    icon: UserPlus,
  },
  {
    name: "Payments",
    url: "/dashboard/developer/payments",
    icon: CreditCard,
  },
  {
    name: "Subscription Categories",
    url: "/dashboard/developer/subscription-categories",
    icon: CircleDollarSign,
  },
  {
    name: "Skill Assessments",
    url: "/dashboard/developer/skill-assessments",
    icon: Award,
  },
];
