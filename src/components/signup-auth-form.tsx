"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { Discord, Google } from "@/components/Icons";
import { useState } from "react";
import { AuthFormData, signInSchema } from "@/lib/zod";
import axios from "axios";
import { WelcomeUser } from "@/utils/welcome-user";
import { useRouter } from "next/navigation";

export function SignupAuthForm() {
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDiscordLoading, setIsDiscordLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: AuthFormData) {
    setIsCredentialsLoading(true);
    try {
      const response = await axios.post("/api/signup", {
        body: {
          email: data.email.toLowerCase(),
          password: data.password,
        },
      });
      // console.log("TES",response)

      setIsCredentialsLoading(false);

      if (!response) {
        return toast.error("Sign in failed. Please try again.");
      }
      if (response.data.error) {
        return toast.error(response.data.error);
      }
       await WelcomeUser(data.email.toLowerCase());
      toast.success("Registed successfully");
      // Sign in the user
      const result = await signIn("credentials", {
        email: data.email.toLowerCase(),
        password: data.password,
        // redirect: false,
      });
      router.refresh();

      if (result?.error) {
        return toast.error("Failed to sign in after registration");
      }
      return;
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setIsCredentialsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await signIn("google", { redirect: true, redirectTo: "/" });
  };

  const handleDiscordSignIn = async () => {
    setIsDiscordLoading(true);
    await signIn("discord", { redirect: true, redirectTo: "/" });
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              radius="sm"
              variant="faded"
              autoCorrect="off"
              {...register("email")}
              disabled={
                isCredentialsLoading || isGoogleLoading || isDiscordLoading
              }
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Input
              id="password"
              placeholder="your password"
              type={isVisible ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="password"
              size="md"
              radius="sm"
              variant="faded"
              {...register("password")}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeOff
                      size={16}
                      className="pointer-events-none text-default-400"
                    />
                  ) : (
                    <Eye
                      size={16}
                      className="pointer-events-none text-default-400"
                    />
                  )}
                </button>
              }
              autoCorrect="off"
              disabled={
                isCredentialsLoading || isGoogleLoading || isDiscordLoading
              }
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            color="primary"
            radius="sm"
            type="submit"
            disabled={isCredentialsLoading}
            isLoading={isCredentialsLoading}
            className="mt-2"
          >
            Continue
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t dark:border-foreground-50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-foreground-500">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-3">
        <Button
          radius="sm"
          type="button"
          onClick={() => handleGoogleSignIn()}
          disabled={isCredentialsLoading || isGoogleLoading || isDiscordLoading}
          isLoading={isGoogleLoading}
        >
          {!isGoogleLoading && <Google className="mr-2 h-4 w-4" />}
          Google
        </Button>
        <Button
          radius="sm"
          type="button"
          onClick={() => handleDiscordSignIn()}
          disabled={isCredentialsLoading || isGoogleLoading || isDiscordLoading}
          isLoading={isDiscordLoading}
        >
          {!isDiscordLoading && <Discord className="mr-2 h-4 w-4" />}
          Discord
        </Button>
      </div>
    </div>
  );
}
