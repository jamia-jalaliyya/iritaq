// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@iritaq.org" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@iritaq.org";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "1",
            name: "IRITAQ Admin",
            email: adminEmail,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/dashboard", // 👈 Make sure this is /admin/dashboard
    error: "/admin/dashboard",  // 👈 Route auth errors here as well
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = (user as User & { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as typeof session.user & { role?: string }).role =
          token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "iritaq-secret-key-change-in-production",
};

// ❌ In v5: const handler = NextAuth(authOptions); export { handler as GET, handler as POST };
// ✅ In v5: Destructure GET and POST from handlers
export const { GET, POST } = NextAuth(authOptions).handlers;