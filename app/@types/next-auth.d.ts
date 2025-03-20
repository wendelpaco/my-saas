// next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession, DefaultJWT } from "next-auth";
import { User as AdapterUser } from "next-auth/adapters"; // Importa a tipagem do adaptador

declare module "next-auth" {
  // Estende a tipagem de `Session` para incluir `role` e `isSuperAdmin`
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      isSuperAdmin: boolean;
    } & DefaultSession["user"];
  }

  // Estende a tipagem de `JWT` para incluir `role` e `isSuperAdmin`
  interface JWT extends DefaultJWT {
    role: string;
    isSuperAdmin: boolean;
  }

  // Estende a tipagem do `User` do adaptador do Prisma (ou qualquer adaptador que você estiver usando)
  interface User extends AdapterUser {
    id: string;
    role: string;
    isSuperAdmin: boolean;
  }
}
