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
  providers: [
    Google,
    Discord,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          let user = null;

          // verify shape of credentials with zod schema
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // if credentials are valid verify if the user exists
          user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user) {
            // If user doesn't exist, create a new user
            const pwHash = await saltAndHashPassword(password);
            const username = generateUsername(email);
            const name = generateDisplayName();

            const [newUser] = await db
              .insert(users)
              .values({
                email,
                password: pwHash,
                username: username,
                name: name,
              })
              .returning();

            user = newUser;
          } else {
            // The User exists so we compare the password
            const isPasswordValid = comparePassword(password, user.password!);

            if (!isPasswordValid) {
              return null;
            }
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          // Log the error
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
});
