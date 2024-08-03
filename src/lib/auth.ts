import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { connectDb } from "./ConnetctDB";
import { generateRandomString } from "./service";




export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
       identifier: {label: "Username or Email", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDb();
        const user = await User.findOne({ 
          $or: [
            { email: credentials.identifier }, 
            { username: credentials.identifier },
            
          ] 
        })
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id, email: user.email, role: user.role, image: user.image, usermame:user.username }; // Ensure returning a plain object
        }
        return null;
      },
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Include user ID in the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user ID in the session
      if (token?.id) {
        session.user.id = token.id;
        // console.log("USER SEESION",session)
      }
      return session;
    },
    async signIn({  user, account, profile }) {
        await connectDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const username = `${user.name}${generateRandomString(6)}`;
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            username,
            userId: user.id
            // Add other fields if necessary
          });
        }
        return true;
      },
  }
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };