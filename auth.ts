import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/utils";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}

const googleEnabled =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    ...(googleEnabled
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = String(credentials.email || "")
          .toLowerCase()
          .trim();
        const password = String(credentials.password || "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      if (!user.email || !user.id) return;
      if (isAdminEmail(user.email)) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "ADMIN" },
        });
      }
    },
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      const t = token as typeof token & {
        id?: string;
        role?: Role;
        picture?: string | null;
      };

      if (user?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { id: true, role: true, image: true },
        });
        t.id = dbUser?.id ?? user.id;
        t.role = dbUser?.role ?? user.role ?? "MEMBER";
        t.picture = dbUser?.image ?? user.image ?? t.picture;
        return t;
      }

      if ((!t.role || trigger === "update") && t.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: t.email },
          select: { id: true, role: true, image: true },
        });
        if (dbUser) {
          t.id = dbUser.id;
          t.role = dbUser.role;
          if (dbUser.image) t.picture = dbUser.image;
        }
      }

      return t;
    },
    async session({ session, token }) {
      if (session.user) {
        const t = token as typeof token & {
          id?: string;
          role?: Role;
          picture?: string | null;
        };
        session.user.id = t.id as string;
        session.user.role = t.role || "MEMBER";
        if (t.picture) session.user.image = t.picture;
      }
      return session;
    },
  },
});
