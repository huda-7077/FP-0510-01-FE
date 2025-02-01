"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { companyRegisterSchema } from "../schemas";

export function CompanyRegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: register, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      terms: false,
    },
    validationSchema: companyRegisterSchema,
    onSubmit: (values) => {
      register({ ...values, role: "ADMIN" });
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Register company</h1>
        <a
          href="/register/user"
          className="group flex items-center justify-end gap-0.5 font-semibold text-[#0A65CC] transition-colors hover:text-[#084c99]"
        >
          Looking for Job?
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
            placeholder="Company Name"
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

        <div className="grid gap-2">
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex min-h-[20px] items-center gap-1">
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs text-red-500">
                  {formik.errors.phoneNumber}
                </p>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
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
      </div>
    </form>
  );
}
