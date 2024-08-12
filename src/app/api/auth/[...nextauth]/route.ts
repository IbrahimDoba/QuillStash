import { drizzleAuthOptions } from "@/db/auth";
import NextAuth from "next-auth";

const handler = NextAuth(drizzleAuthOptions);

export { handler as GET, handler as POST };
// import { authOptions } from "@/lib/auth";
// import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };