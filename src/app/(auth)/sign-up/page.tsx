import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Button } from "@nextui-org/react";
import { SiteLogo } from "@/components/Icons";
import { ArrowLeft } from "lucide-react";
import { SignupAuthForm } from "@/components/signup-auth-form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata = {
  title: "Create account",
  openGraph: {
    description: "Create an account to get started.",
  },
};

export default function RegisterPage() {
  return (
    <div className="grid h-screen w-screen flex-col items-center justify-center px-6 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button
        radius="sm"
        className="absolute right-4 top-4 flex items-center gap-2 md:right-8 md:top-8 lg:hidden"
      >
        <ArrowLeft className="h-4 w-4" />
        <Link href="/login">Back</Link>
      </Button>
      <div className="hidden h-full place-content-center bg-slate-100 dark:bg-slate-900 lg:grid">
        <div className="flex items-center gap-3">
          <div className="w-full max-w-full lg:max-w-lg">
            <svg width="512" height="412" viewBox="0 0 960 960">
              <use href="/product-launch.svg#product-launch"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-foreground-500">
              Enter your email below to create your account
            </p>
          </div>
          <SignupAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="hover:text-brand underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
