// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
      
        // 1) Basic validation
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 2) Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        

        if (!user) {
          // No user with this email
          return null;
        }

        // 3) Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        // 4) Return object that becomes "session.user"
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  // We’ll use JWT-based sessions
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // use our custom login page
  },

  callbacks: {
    async jwt({ token, user }) {
      // When user logs in, copy id to token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Make session.user.id available
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};



