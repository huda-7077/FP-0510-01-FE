import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { axiosInstance } from "@/lib/axios";
import { NEXT_PUBLIC_GOOGLE_CLIENT_ID, NEXT_PUBLIC_GOOGLE_CLIENT_SECRET } from "@/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const response = await axiosInstance.post("/auth/google-login", {
            token: account.access_token,
          });
          
          if (response.data) {
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
      }
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
