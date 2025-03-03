"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2Icon,
} from "lucide-react";
import { useState } from "react";
import { ResetPasswordSchema } from "../schemas";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Reset password</h1>
      </div>

      <div className="grid gap-2">
        <div className="grid gap-3">
          <div className="relative">
            <div className="group relative">
              <label
                htmlFor="password"
                className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
              >
                <span className="inline-flex bg-background px-2">
                  New password
                </span>
              </label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.password && formik.errors.password
                    ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
                    : "text-gray-500"
                }
              />
            </div>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          <div className="flex min-h-[20px] items-center gap-1">
            {formik.touched.password && formik.errors.password ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <div className="relative">
            <div className="group relative">
              <label
                htmlFor="confirmPassword"
                className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
              >
                <span className="inline-flex bg-background px-2">
                  Confirm new password
                </span>
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
                    : "text-gray-500"
                }
              />
            </div>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          <div className="flex min-h-[20px] items-center gap-1">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              </>
            ) : null}
          </div>
        </div>

        <Button
          type="submit"
          className="group w-full bg-[#0A65CC] text-white hover:bg-[#084c99]"
          disabled={isPending}
        >
          {isPending ? "Loading" : "Set New Password"}
          {isPending ? (
            <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </Button>
      </div>
    </form>
  );
}
