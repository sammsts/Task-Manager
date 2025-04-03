import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { prisma } from "@/src/app/lib/prisma";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Google Client ID e Secret não estão configurados corretamente.");
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        let usuarios = await prisma.usuarios.findFirst({
          where: { email: credentials.email, senha: credentials.password }
        });
        
        if (!usuarios) {
          console.log(`Usuário de e-mail "${credentials.email}" não encontrado!!!`)

          usuarios = await prisma.usuarios.create({
            data: {
              email: credentials.email,
              nome: credentials.email.split("@")[0],
              senha: credentials.password
            },
          });

          console.log(`Criado usuário "${usuarios.nome}"!!!`)
        }

        if (usuarios) {
          return { id: usuarios.id, name: usuarios.nome, email: usuarios.email };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" as const },
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) return false;
        
        let existingUser = await prisma.usuarios.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          existingUser = await prisma.usuarios.create({
            data: {
              nome: user.name ?? "Usuário Desconhecido",
              email: user.email,
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        return false;
      }
    },
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = {
          name: token.user.name ?? null,
          email: token.user.email ?? null,
          image: token.user.image ?? null,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };