"use client";

import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/hooks/api/auth/useVerifyEmail";
import { setVerificationSuccess } from "@/redux/slices/verificationSlice";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const VerifyTokenPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("The verification link is invalid or has expired.");
  
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token provided");
      return;
    }

    if (isVerified) {
      setStatus("success");
      return;
    }

    verifyEmail(token, {
      onSuccess: (data) => {
        if (data.isVerified) {
          setStatus("success");
          setIsVerified(true);  // Mark the token as verified
          dispatch(setVerificationSuccess());
          setTimeout(() => router.push("/verify/success"), 2000);
        } else {
          setStatus("error");
          setErrorMessage("Email verification failed.");
        }
      },
      onError: (error: any) => {
        setStatus("error");
        setErrorMessage(
          error?.response?.data?.message || "Verification failed. Please try again."
        );
      },
    });
  }, [token, verifyEmail, dispatch, router, isVerified]);  

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
              {status === "loading" && (
                <Loader2 className="h-12 w-12 animate-spin text-[#0A65CC]" />
              )}
              {status === "success" && (
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              )}
              {status === "error" && (
                <XCircle className="h-12 w-12 text-red-500" />
              )}
            </div>

            <h1 className="mb-4 text-2xl font-bold">
              {status === "loading" && "Verifying your email..."}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </h1>

            <p className="mb-8 text-gray-600">
              {status === "loading" &&
                "Please wait while we verify your email address."}
              {status === "success" &&
                "Your email has been successfully verified. Redirecting..."}
            </p>

            {status === "error" && (
              <div className="flex flex-col items-center space-y-4">
                <p className="mb-8 text-gray-600">{errorMessage}</p>
                <Button
                  className="w-48 bg-[#0A65CC] text-white hover:bg-[#084c99]"
                  onClick={() => router.push("/login")}
                >
                  Back to Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyTokenPage;
