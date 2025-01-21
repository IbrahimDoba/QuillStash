// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { User as UserSchema } from '@/db/schema';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image?: string | null;
      role?: string | null;
      username: string | null;
      usernameConfirmed: Date | null; 
    };
  }

  interface User extends UserSchema {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
