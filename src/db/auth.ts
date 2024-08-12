import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, users, accounts, sessions, verificationTokens } from "@/db/schema"; // Adjust the import path as needed
import { generateRandomString, generateUsername } from "@/lib/service";
import { eq } from "drizzle-orm";


export const drizzleAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Keeping the JWT strategy
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Handling Google sign-in
      if (account?.provider === "google" && profile) {
        // Check if the user exists in the Drizzle database
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, profile.email!))
          .execute();
          
        // If the user does not exist, create a new user
        if (!existingUser.length) {
          const newUser = await db.insert(users).values({
            email: profile.email!,
            name: profile.name!,
            image: profile.image!,
            username: `${profile.name}${generateRandomString(6)}`,
          }).returning();
          token.id = newUser[0].id;
        } else {
          token.id = existingUser[0].id;
        }
      } else if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // Check if the user already exists in Drizzle
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email!))
        .execute();

      // If not, create a new user in the database
      if (!existingUser.length) {
        const username = `${generateUsername(user.name!)}`;
        await db.insert(users).values({
          email: user.email!,
          name: user.name!,
          image: user.image!,
          username,
        }).execute();
      }
      return true;
    },
  },
};
