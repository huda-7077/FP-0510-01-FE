"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useGoogleAuth } from "@/hooks/api/auth/useGoogleAuth";
import useRegister from "@/hooks/api/auth/useRegister";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2Icon,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { userRegisterSchema } from "../schemas";
import Link from "next/link";

export function UserRegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: register, isPending } = useRegister();
  const { login } = useGoogleAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      terms: false,
    },
    validationSchema: userRegisterSchema,
    onSubmit: (values) => {
      register({ ...values, role: "USER" });
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Create account</h1>
        <a
          href="/register/admin"
          className="group flex items-center justify-end gap-0.5 font-semibold text-[#0A65CC] transition-colors hover:text-[#084c99]"
        >
          Looking to Hire?
          <ArrowRight className="h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-[#0A65CC]">
          Sign in
        </a>
      </div>

      <div className="grid gap-2">
        <div className="grid gap-2">
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex min-h-[20px] items-center gap-1">
            {formik.touched.fullName && formik.errors.fullName ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-500">{formik.errors.fullName}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex min-h-[20px] items-center gap-1">
            {formik.touched.email && formik.errors.email ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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

        <div className="grid gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formik.values.terms}
              onCheckedChange={(checked) =>
                formik.setFieldValue("terms", checked)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I've read and agree with your{" "}
              <a href="/terms" target="_blank" className="text-[#0A65CC]">
                Terms of Services
              </a>
            </label>
          </div>
          <div className="flex min-h-[20px] items-center gap-1">
            {formik.touched.terms && formik.errors.terms ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-500">{formik.errors.terms}</p>
              </>
            ) : null}
          </div>
        </div>

        <Button
          type="submit"
          className="group w-full bg-[#0A65CC] text-white hover:bg-[#084c99]"
          disabled={isPending || !formik.values.terms}
        >
          {isPending ? "Creating Account" : "Create Account"}
          {isPending ? (
            <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => login()}
          type="button"
          disabled={!formik.values.terms}
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign up with Google
        </Button>
      </div>
    </form>
  );
}
