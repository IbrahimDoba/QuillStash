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

  
  // Check if the user has the "writer" role
  if (session.user?.role !== "writer") {
    redirect("/") // Redirect to homepage if not a writer
  }

  const userIsAllowed = session?.user.usernameConfirmed;
  if (!userIsAllowed) {
    return (
      <div className="grid min-h-screen place-content-center">
        <div className="max-w-sm">
          <ConfirmForm username={session?.user.username} name={session?.user.name} />
        </div>
      </div>
    );
  }

  return <PageContent />;
};

export default Page;
