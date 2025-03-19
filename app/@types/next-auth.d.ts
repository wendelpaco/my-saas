// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      isSuperAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface JWT {
    role: string;
    isSuperAdmin: boolean;
  }
}
