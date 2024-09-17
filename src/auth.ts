import NextAuth, { User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { accounts, sessions, users } from "@/db/schema";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { comparePassword, saltAndHashPassword } from "@/utils/password";
import { eq } from "drizzle-orm";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { generateDisplayName, generateUsername } from "./lib/service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      async profile(profile) {
        const username = generateUsername(profile.email);

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture || `https://avatar.vercel.sh/${profile.name}?size=30`,
          username,
        } as User;
      },
    }),
    Discord({
      async profile(profile) {
        const username = generateUsername(profile.email);
        const displayName = generateDisplayName();

        return {
          id: profile.id,
          name: displayName,
          email: profile.email,
          image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          username,
        } as User;
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Check if the user exists
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user) {
            // User doesn't exist, return an error
            return null;
          }

          // Verify the password
          const isPasswordValid = await comparePassword(
            password,
            user.password!
          );
          if (!isPasswordValid) {
            return null; // Return null if password is incorrect
          }
          console.log("userhere", user);
          return user; // Return the user if login is successful
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Unexpected error during authorization:", error);
            return null; // Invalid credentials shape
          }
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.username = user.username;
        token.isConfirmed = user.usernameConfirmed;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        console.log(session)
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.username = token.username as string;
        session.user.usernameConfirmed  = token.usernameConfirmed  as Date | null;
        // Fetch the latest user data from the database
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
        });
        if (dbUser) {
          session.user.name = dbUser.name;
          session.user.image = dbUser.image;
          session.user.username = dbUser.username;
        }
      }
      return session;
    },
  },
});
