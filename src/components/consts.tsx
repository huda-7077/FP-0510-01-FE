import {
  Award,
  Badge,
  BadgeCheck,
  BadgeIcon,
  BadgePlus,
  BadgeX,
  BellRing,
  Bookmark,
  BriefcaseBusiness,
  Building,
  CircleDollarSign,
  Clock,
  CreditCard,
  FileBadge,
  FileBadge2,
  FileStack,
  Layers,
  Luggage,
  PencilLine,
  Settings,
  Trophy,
  UserPlus,
} from "lucide-react";
import { FaIdBadge } from "react-icons/fa6";

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
    url: "/dashboard/admin/interviews",
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
    name: "Settings",
    url: "/dashboard/user/settings",
    icon: Settings,
  },
];

export const developerSidebarLinks = [
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
