import React from "react";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import PageContent from "./page-content";
import { Metadata } from "next";
import { ConfirmForm } from "./confirm-form";

export const metadata: Metadata = {
  title: "New article",
  description: "Write a new post",
};

const Page = async () => {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const userIsAllowed = session?.user.usernameConfirmed;

  if (!userIsAllowed) {
    return (
      <div className="grid min-h-screen place-content-center">
        <div className="max-w-sm">
          <ConfirmForm username={"rahim"} name={"Taqib"} />
        </div>
      </div>
    );
  }

  return <PageContent />;
};

export default Page;
