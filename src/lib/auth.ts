import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { connectDb } from "./ConnetctDB";

const generateRandomString = (length:any) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



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
            { username: credentials.identifier }
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
    async signIn({ user, account, profile }) {
        await connectDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const username = `${user.name}${generateRandomString(6)}`;
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            username
            // Add other fields if necessary
          });
        }
        return true;
      },
  }
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };