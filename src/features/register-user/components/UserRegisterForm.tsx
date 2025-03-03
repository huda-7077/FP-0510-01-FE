"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useGoogleAuth } from "@/hooks/api/auth/useGoogleAuth";
import useRegister from "@/hooks/api/auth/useRegister";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2Icon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { userRegisterSchema } from "../schemas";

export function UserRegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: register, isPending } = useRegister();
  const { login: googleLogin } = useGoogleAuth();

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
          <div className="group relative">
            <label
              htmlFor="fullName"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">Full Name</span>
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder=""
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.fullName && formik.errors.fullName
                  ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
                  : "text-gray-500"
              }
            />
          </div>
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
          <div className="group relative">
            <label
              htmlFor="email"
              className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
            >
              <span className="inline-flex bg-background px-2">
                Email address
              </span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email
                  ? "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
                  : "text-gray-500"
              }
            />
          </div>
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
            <div className="group relative">
              <label
                htmlFor="password"
                className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
              >
                <span className="inline-flex bg-background px-2">Password</span>
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
                  Confirm password
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
                Terms of Service
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
          onClick={() => googleLogin()}
          type="button"
          disabled={isPending || !formik.values.terms}
        >
          <Image src="/google-icon.svg" alt="google" width={16} height={16} />
          Sign in with Google
        </Button>
      </div>
    </form>
  );
}
