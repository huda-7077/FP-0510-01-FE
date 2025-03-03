import JobApplicationClient from "@/features/job-application";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function JobApplicationPage({ params }: { params: { id: string } }) {
  const session = await auth();
  
  if (typeof window !== 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const secondCheck = await auth();
  
  if (!session && !secondCheck) {
    redirect("/login");
  }

  if (session?.user.role !== "USER" && secondCheck?.user.role !== "USER") {
    redirect("/");
  }

  return <JobApplicationClient params={params} />;
}
