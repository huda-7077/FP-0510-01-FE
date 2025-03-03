"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { CompanyRegisterForm } from "./components/CompanyRegisterForm";

export default function CompanyRegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/">
            <Image
              src="/logo-company.svg"
              alt="logo"
              width={187}
              height={102}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <CompanyRegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/register-company.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#084c99] via-[#084c99]/30 to-transparent" />

        <div className="absolute bottom-16 left-10 right-10 text-white">
          <h2 className="mb-2 text-3xl font-bold">Find Top Talent Today</h2>
          <p className="text-lg">
            Connect with skilled professionals and grow your team
          </p>
        </div>
      </div>
    </div>
  );
}
