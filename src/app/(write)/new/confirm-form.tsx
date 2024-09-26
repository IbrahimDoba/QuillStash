"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { confirmSchema, ConfirmValues } from "@/lib/zod";
import { confirmUsername } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteLogo } from "@/components/Icons";
import { ArrowLeft } from "lucide-react";

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
        toast.loading("Granting access");
        router.refresh();
      }
    } catch (error) {
      console.error("Error confirming user:", error);
      toast.error("An error occurred while saving your details");
    }
  }

  return (
    <div className="grid min-h-screen w-full place-content-center p-4">
      <Button
        radius="sm"
        size="sm"
        className="absolute left-4 top-4 flex items-center gap-2 md:right-8 md:top-8 w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        <Link href="/home">Back</Link>
      </Button>
      <div className="flex max-w-sm flex-col gap-8 rounded-md p-6">
        <div className="flex flex-col items-center gap-4 leading-3">
          <SiteLogo size={40} />

          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Confirm username</h1>
            <p className="text-center text-sm text-foreground-600">
              To get started writing please confirm the username you would like to use.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username
              </label>
              <div>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-foreground-700 sm:text-sm">
                    quillstash.com/
                  </span>
                  <input
                    type="text"
                    id="username"
                    placeholder="johndoe"
                    autoComplete="off"
                    autoCapitalize="none"
                    disabled={isSubmitting}
                    {...register("username")}
                    autoCorrect="off"
                    className="block flex-1 border-0 bg-transparent py-2 pl-1 placeholder:text-gray-400 focus:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors?.username && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
                {/* <p className="px-1 text-xs text-foreground-400">
                Username must be 3-20 characters long and can only contain
                letters, numbers, hyphens, and underscores. No spaces allowed.
              </p> */}
              </div>
            </div>
            {/* <div className="grid gap-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="john doe"
                autoComplete="name"
                autoCapitalize="none"
                disabled={isSubmitting}
                {...register("name")}
                autoCorrect="off"
                className="block flex-1 rounded-md border border-gray-300 bg-transparent px-4 py-2 placeholder:text-foreground-400 focus:outline-primary focus:ring-primary focus:ring-offset-2 sm:text-sm sm:leading-6"
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div> */}
            <Button
              color="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
              radius="sm"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
