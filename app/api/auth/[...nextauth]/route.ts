import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // ✅ Necessário para NextAuth v5+
  },
  callbacks: {
    async jwt({ token, user }) {
      // Não é necessário consultar o banco novamente. Use os dados já disponíveis do `user`.
      if (user) {
        token.id = user.id; // Usando o ID que foi retornado do `authorize`
        token.role = user.role;
        token.isSuperAdmin = user.isSuperAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.isSuperAdmin = token.isSuperAdmin as boolean;
        session.user.id = token.id as string; // Atribui o ID do token à sessão
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("callbackUrl")) {
        const newUrl = url.split("?callbackUrl=")[0]; // Remove o callbackUrl da URL
        return newUrl; // Retorna a URL sem o parâmetro callbackUrl
      }
      return url; // Se não tiver callbackUrl, retorne o redirecionamento padrão
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exemplo@email.com",
        },
        password: { label: "Senha", type: "password" },
        name: { label: "nome", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios!");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Usuário não encontrado");

        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        );
        if (!passwordMatch) throw new Error("Senha incorreta!");

        // Retorna diretamente os dados do usuário
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isSuperAdmin: user.isSuperAdmin,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Página de login customizada
    error: "/auth/error", // Página de erro (caso o login falhe)
  },
  secret: process.env.NEXTAUTH_SECRET, // Certifique-se de definir isso no `.env.local`
};

// Apenas exporte o handler para GET e POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
