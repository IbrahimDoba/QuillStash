"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { confirmSchema, ConfirmValues } from "@/lib/zod";
import { confirmUsername } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ConfirmForm({
  username,
  name,
}: {
  name: string;
  username: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmValues>({
    resolver: zodResolver(confirmSchema),
    defaultValues: {
      name: name,
      username: username,
    },
  });
  const router = useRouter();

  async function onSubmit(data: ConfirmValues) {
    try {
      console.log("Submitting:", data);
      const response = await confirmUsername(data);

      if (response?.success) {
        toast.success("Details saved successfully");
        // Navigate to the new username page
        router.push(`/${response.username}`);
      }
    } catch (error) {
      console.error("Error confirming user:", error);
      toast.error("An error occurred while saving your details");
    }
  }

  return (
    <div className="grid w-full gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2.5">
            <Input
              id="username"
              placeholder="your-username"
              type="username"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
            <p className="px-1 text-xs text-gray-500">
              Username must be 3-20 characters long and can only contain
              letters, numbers, hyphens, and underscores. No spaces allowed.
            </p>
          </div>
          <div className="grid gap-2.5">
            <Input
              id="name"
              placeholder="your-name"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <Button
            color="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Confirm
          </Button>
          <Link href="/home">
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="button"
          >
            Skip
          </Button>
          </Link>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <p className="text-muted-foreground bg-background px-2">
            You can skip this step and do it later in the settings
          </p>
        </div>
      </div>
    </div>
  );
}
