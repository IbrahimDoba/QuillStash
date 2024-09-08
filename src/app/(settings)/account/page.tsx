import { db } from "@/db";
import getSession from "@/lib/getSession";
import PageContent from "./page-content";
import { users, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
};

async function Page() {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) return redirect("/");

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: { accounts: true }
  });


  if (!userData) return notFound();


  return (
    <section className="min-h-screen px-6 py-10 md:px-2 md:py-20">
      <div className="mx-auto max-w-screen-sm">
        <div className="mb-6 flex flex-col border-b pb-4 md:mb-8 lg:mb-10 lg:pb-6">
          <h1 className="text-2xl font-bold">Account</h1>
          <p className="text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <PageContent userData={userData} userAccounts={userData.accounts} />
      </div>
    </section>
  );
}

export default Page;
