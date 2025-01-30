"use client";

import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useResendVerification } from "@/hooks/api/auth/useResendVerification";
import { useState, useEffect } from "react";

export default function VerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { mutate: resendVerification, isPending } = useResendVerification();
  const [countdown, setCountdown] = useState(60); // Start with 60 seconds

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    if (email) {
      resendVerification(email);
      setCountdown(60);
    }
  };

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
          <div className="absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 transform rounded-full bg-blue-50/50" />
          <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 transform rounded-full bg-blue-50/80" />
          <div className="relative">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <MailIcon className="h-12 w-12 text-[#0A65CC]" />
              </div>
            </div>

            <h1 className="mb-4 text-2xl font-bold">Check your email</h1>

            <p className="mb-8 text-gray-600">
              We've sent a verification link to your email address. Please click
              the link to verify your account.
            </p>

            <div className="flex flex-col items-center space-y-4">
              <Button
                className="w-48 bg-[#0A65CC] text-white hover:bg-[#084c99]"
                onClick={() => router.push("/login")}
              >
                Back to Login
              </Button>

              <Button
                variant="outline"
                className="w-48"
                onClick={handleResend}
                disabled={isPending || countdown > 0}
              >
                {isPending
                  ? "Sending..."
                  : countdown > 0
                    ? `Resend in ${countdown}s`
                    : "Resend Verification Email"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
