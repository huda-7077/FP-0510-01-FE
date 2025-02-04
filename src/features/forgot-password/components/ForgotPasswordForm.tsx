"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { AlertCircle, ArrowRight, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { ForgotPasswordSchema } from "../schemas";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { mutate: ForgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      ForgotPassword(values);
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Forgot Password</h1>
      </div>

      <div className="text-sm text-gray-500">
        <Link href="/login" className="text-sm text-[#0A65CC]">
          Remember password?
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

        <Button
          type="submit"
          className="group w-full bg-[#0A65CC] text-white hover:bg-[#084c99]"
          disabled={isPending}
        >
          {isPending ? "Loading" : "Send Email"}
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
