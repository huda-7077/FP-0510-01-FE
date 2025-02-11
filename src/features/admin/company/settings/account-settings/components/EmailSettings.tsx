"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useChangeEmail from "@/hooks/api/account/useChangeEmail";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import { useResendVerification } from "@/hooks/api/auth/useResendVerification";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { AlertTriangle, CheckCircle, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const EmailSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: changeEmail, isPaused: isUpdatingEmail } = useChangeEmail();
  const { mutate: resendVerification, isPending: isResending } =
    useResendVerification();
  const { data: userData } = useGetProfile();
  const isVerified = userData?.isVerified || false;
  const [cooldownEndTime, setCooldownEndTime] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required to change email"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      changeEmail(
        { email: values.email },
        {
          onSuccess: () => {
            setSubmitting(false);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
          },
          onError: () => {
            setSubmitting(false);
          },
        },
      );
    },
  });

  useEffect(() => {
    if (cooldownEndTime) {
      const timer = setInterval(() => {
        const end = new Date(cooldownEndTime).getTime();
        const now = new Date().getTime();
        const remaining = Math.ceil((end - now) / 1000);

        if (remaining <= 0) {
          setRemainingTime(null);
          setCooldownEndTime(null);
          clearInterval(timer);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cooldownEndTime]);

  const handleResendVerification = () => {
    if (userData?.email) {
      resendVerification(userData.email, {
        onSuccess: (data) => {
          if (data?.nextAllowedTime) {
            setCooldownEndTime(data.nextAllowedTime);
          }
          queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: any) => {
          if (error.response?.data?.nextAllowedTime) {
            setCooldownEndTime(error.response.data.nextAllowedTime);
          }
        },
      });
    }
  };

  const isButtonDisabled =
    isResending ||
    (cooldownEndTime && new Date(cooldownEndTime) > new Date()) ||
    false;

  const buttonContent = () => {
    if (isResending) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending Verification
        </>
      );
    }
    if (remainingTime) {
      return `Resend available in ${remainingTime}s`;
    }
    return "Send verification email";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Settings
        </Label>
        <p className="text-gray-500">
          Change your email and manage verification status
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <Input
              type="email"
              placeholder="New email address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.email && formik.touched.email
                  ? "flex-1 border-red-500"
                  : "flex-1"
              }
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isUpdatingEmail || !formik.isValid || formik.isSubmitting}
            className="w-full bg-[#0a65cc] hover:bg-[#254e7e] md:max-w-fit md:px-7"
          >
            {isUpdatingEmail ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Changing Email
              </>
            ) : (
              "Change Email"
            )}
          </Button>
        </div>
      </form>

      {isVerified ? (
        <Alert
          variant="default"
          className="flex items-center justify-start bg-green-50 p-4"
        >
          <CheckCircle className="h-4 w-4" color="#008e00" />
          <AlertDescription className="text-green-700">
            Your email is verified.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert
          variant="default"
          className="flex items-center justify-start bg-yellow-50 p-4"
        >
          <AlertTriangle className="h-4 w-4" color="#ff9300" />
          <AlertDescription>
            Your email is not verified.
            <Button
              variant="link"
              onClick={handleResendVerification}
              disabled={isButtonDisabled}
              className="h-auto px-2 py-0 font-semibold text-blue-800"
            >
              {buttonContent()}
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EmailSettings;
