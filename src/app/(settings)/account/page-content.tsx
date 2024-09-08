"use client";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { userAccountSchema, UserAccountValues } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/db/schema";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Discord, Google } from "@/components/Icons";
import ConfirmationModal from "./confirmation-modal";

interface AccountProvider {
  provider: string;
}

function AccountForm({
  userData,
  userAccounts,
}: {
  userData: User;
  userAccounts: AccountProvider[];
}) {
  const [profileInfo] = useState({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    website: userData.website,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserAccountValues>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: profileInfo,
  });

  async function onSubmit(data: UserAccountValues) {
    try {
      console.log("submitted");
    } catch (error) {
      toast("something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="mb-4 flex flex-col">
        <Input
          type="text"
          id="name"
          label="Name"
          radius="sm"
          description="Your full name"
          readOnly
          {...register("name")}
        />
        {errors.name && (
          <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <Input
          type="text"
          id="email"
          label="Email"
          readOnly
          radius="sm"
          description="Your email address"
          {...register("email")}
        />
        {errors.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="my-4 space-y-4">
        <p className="font-semi-bold mt-4">Linked accounts</p>

        <ul className="grid lg:grid-cols-2">
          {userAccounts.map(({ provider }) => (
            <li
              key={provider}
              className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-8 capitalize"
            >
              {provider === "discord" ? (
                <Discord className="size-6 lg:size-8" />
              ) : (
                <Google className="size-6 lg:size-8" />
              )}
              <p className="font-semibold lg:text-lg">{provider}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="borde-y rounded-md py-4">
        <p className="mb-2 text-lg lg:text-xl font-semibold ">Delete account</p>
        <p className="text-foreground-600 mb-8 text-sm">
          Delete all your data from our servers.
        </p>
        <ConfirmationModal id={userData.id} />
      </div>
    </form>
  );
}

export default AccountForm;
