"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const VerifySuccessPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="fixed top-0 z-50 w-full p-6">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={116}
            height={30}
            className="mx-auto"
          />
        </Link>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="relative mx-auto max-w-md text-center">
          <div className="absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 transform rounded-full bg-green-50/50" />

          <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 transform rounded-full bg-green-50/80" />

          {/* Conten */}
          <div className="relative">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <h1 className="mb-4 text-2xl font-bold">Verification Complete!</h1>

            <p className="mb-8 text-gray-600">
              Your email has been successfully verified. You can now access all
              features of your account.
            </p>

            <div className="flex flex-col items-center space-y-4">
              <Button
                className="w-48 bg-[#0A65CC] text-white hover:bg-[#084c99]"
                onClick={() => router.push("/login")}
              >
                Continue to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifySuccessPage;
