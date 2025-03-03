"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={116} height={30} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/register.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#084c99] via-[#084c99]/30 to-transparent" />

        <div className="absolute bottom-16 left-10 right-10 text-white">
          <h2 className="mb-2 text-3xl font-bold">Find Your Dream Job Today</h2>
          <p className="text-lg">
            Connect with top companies and unlock your career potential
          </p>
        </div>
      </div>
    </div>
  );
}
