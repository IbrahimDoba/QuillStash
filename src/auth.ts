import NextAuth, { User } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { accounts, sessions, users } from '@/db/schema';
import Google from 'next-auth/providers/google';
import Discord from "next-auth/providers/discord"
import Credentials from 'next-auth/providers/credentials';
import { comparePassword, saltAndHashPassword } from '@/utils/password';
import { eq } from 'drizzle-orm';
import { signInSchema } from './lib/zod';
import { ZodError } from 'zod';
import { generateDisplayName, generateUsername } from './lib/service';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  session: {
    strategy: "database",
  },
  providers: [
    Google({
      async profile(profile) {
        const username = generateUsername(profile.email);
        const displayName = generateDisplayName();

        return {
          id: profile.sub,
          name: displayName,
          email: profile.email,
          image: profile.picture,
          username, 
          emailVerified: null,
          password: null,
          role: null,
          bio: null,
          location: null,
          pronouns: null,
          work: null,
          github: null,
          followers: null,
          following: null,
          createdAt: new Date(),  
          updatedAt: new Date(),
          website: null,
          socials: null,
        };
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
          image: profile.avatar,
          username, 
          emailVerified: null,
          password: null,
          role: null,
          bio: null,
          location: null,
          pronouns: null,
          work: null,
          followers: null,
          following: null,
          createdAt: new Date(),  
          updatedAt: new Date(),
          website: null,
          socials: null,
        };
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
    
          // Check if the user exists
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user) {
            // User doesn't exist, return an error
            return null;
          }
    
          // Verify the password
          const isPasswordValid = await comparePassword(password, user.password!);
          if (!isPasswordValid) {
            return null; // Return null if password is incorrect
          }
          console.log("userhere", user)
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
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user)
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (user) {
        // console.log("Session callback - session:", session);
        // console.log("Session callback - token:", token);
        // console.log("Session callback - user:", user);
        return {
          ...session,
          user: {
            ...session.user,
            username: user.username
          }
        }
      }
      return session;
    },
  },
});