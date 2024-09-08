import { db } from "@/db";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteAccount = async (id: string) => {
  const [deletedAccount] = await db
    .delete(accounts)
    .where(eq(accounts.userId, id))
    .returning();

  // after deleting the accounts
  // delete their bookmarks
  // delete the likes
  // delete the comments
  // delete the replies 
  // mark all their post as unpublished

  return Response.json("deleted account successfully", {
    status: 200,
  });
};
