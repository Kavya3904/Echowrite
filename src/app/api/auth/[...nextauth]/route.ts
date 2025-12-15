import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
console.log("NextAuth handler initialized with options:", handler);
export { handler as GET, handler as POST };