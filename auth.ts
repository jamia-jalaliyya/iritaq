// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const inputEmail = String(credentials.email).toLowerCase().trim();
        const inputPassword = String(credentials.password);

        const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Helpful terminal debugging
        console.log("-----------------------------------------");
        console.log("Input Email:", inputEmail);
        console.log("Env Email:  ", adminEmail);
        console.log("-----------------------------------------");

        if (inputEmail === adminEmail && inputPassword === adminPassword) {
          return {
            id: "1",
            email: inputEmail,
            name: "IRITAQ Admin",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
});