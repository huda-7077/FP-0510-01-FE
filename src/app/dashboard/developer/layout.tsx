import { DeveloperLayout } from "@/components/layouts/DeveloperLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DeveloperLayout>{children}</DeveloperLayout>;
}
