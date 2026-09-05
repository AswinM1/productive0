// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],

  secret: process.env.SECRET,

  callbacks: {
    async signIn({ user }: any) {
      if (!user.email) {
        return false;
      }

      await prisma.user.upsert({
        where: {
          email: user.email,
        },

        update: {
          name: user.name,
      
        },

        create: {
          email: user.email,
          name: user.name,
        
        },
      });

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };