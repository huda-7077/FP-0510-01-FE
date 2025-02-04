import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { axiosInstance } from "@/lib/axios";
import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
} from "@/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
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
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        try {
          const response = await axiosInstance.post("/auth/google-login", {
            token: account.access_token,
          });
          if (response.data) {
            // Store the backend response in the user object
            profile!.backendData = response.data;
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        // Store the backend data in the JWT token
        if (profile?.backendData) {
          token.backendData = profile.backendData;
        }
      }
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken;
        // Pass the backend data to the session
        if (token.backendData) {
          session.user = token.backendData;
        } else {
          session.user = token.user;
        }
      }
      return session;
    },
  },
});
