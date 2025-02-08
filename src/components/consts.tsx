import {
  Building,
  CircleDollarSign,
  Clock,
  CreditCard,
  FileStack,
  Luggage,
  UserPlus,
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
];
