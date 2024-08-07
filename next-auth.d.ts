// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }


  interface User {
    id: string;
  }
  
}

declare module "next-auth/jwt" {
    interface JWT {
      id: string;
    }
}  