import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="container mx-auto mt-12 grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 pb-10 md:py-16">
      <Card className="space-y-5 rounded-lg bg-gray-100 p-6 duration-500 hover:shadow-xl md:p-10 lg:p-20">
        <h3 className="text-lg font-semibold md:text-xl">
          Take Your Career to the Next Level
        </h3>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Join a network of top professionals and unlock exciting job
          opportunities tailored just for you.
        </p>
        <Link href="/register/user">
          <Button className="mt-4 w-full rounded-sm border border-gray-600 hover:bg-transparent hover:text-gray-600 md:w-auto">
            Join as a Candidate →
          </Button>
        </Link>
      </Card>

      <Card className="space-y-5 rounded-lg bg-blue-600 p-6 text-white duration-500 hover:shadow-xl md:p-10 lg:p-20">
        <h3 className="text-lg font-semibold md:text-xl">
          Find the Best Talent for Your Business
        </h3>
        <p className="mt-2 text-sm text-blue-200 md:text-base">
          Connect with skilled professionals who can drive your company forward.
          Post jobs and hire with ease.
        </p>
        <Link href="/register/admin">
          <Button className="mt-4 w-full rounded-sm border border-white bg-white text-blue-600 hover:bg-blue-600 hover:text-white md:w-auto">
            Join as an Employer →
          </Button>
        </Link>
      </Card>
    </section>
  );
}
