"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/api/auth/useLogin";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2Icon,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { loginSchema } from "../schemas";
import { useGoogleAuth } from "@/hooks/api/auth/useGoogleAuth";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const { login: googleLogin } = useGoogleAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Welcome back</h1>
      </div>

      <div className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link href="/register/user" className="text-[#0A65CC]">
          Sign up
        </Link>
      </div>

      <div className="grid gap-2">
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
                htmlFor="pasword"
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

        <Button
          type="submit"
          className="group w-full bg-[#0A65CC] text-white hover:bg-[#084c99]"
          disabled={isPending}
        >
          {isPending ? "Signing In" : "Sign In"}
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
          disabled={isPending}
        >
          <Image src="/google-icon.svg" alt="google" width={16} height={16} />
          Sign in with Google
        </Button>
      </div>
      <Link href="/forgot-password" className="text-sm text-[#0A65CC]">
        Forgot password?
      </Link>
    </form>
  );
}
