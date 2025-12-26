/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        firebaseToken: { label: "Firebase Token", type: "text" }, // Add this
      },
      async authorize(credentials) {
        try {
          let res;
          
          // CASE A: Social Login (Firebase Token)
          if (credentials?.firebaseToken) {
             res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/firebase-login`, {
               token: credentials.firebaseToken
             });
          } 
          // CASE B: Standard Email/Password
          else {
             res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
               email: credentials?.email,
               password: credentials?.password,
             });
          }

          if (res.data) {
            return {
              id: res.data.user._id,
              name: res.data.user.name,
              email: res.data.user.email,
              image: res.data.user.image,
              accessToken: res.data.access_token,
            } as any;
          }
          return null;
        } catch (e) {
          throw new Error("Login failed",e as any);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 1. On Initial Login: Copy data from Backend response to Token
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = (user as any).id;
        token.picture = (user as any).image; // <--- CRITICAL: Save image to token
      }

      // 2. On Profile Update: Update the token if session data changes
      if (trigger === "update" && session?.user) {
        token.picture = session.user.image;
        token.name = session.user.name;
      }
      
      return token;
    },
    async session({ session, token }) {
      // 3. Pass Token data to the Session (which Navbar uses)
      if (token) {
        session.user = {
          ...session.user,
          name: token.name,
          email: token.email,
          image: token.picture as string, // <--- CRITICAL: Pass image to session
        };
        (session as any).user.accessToken = token.accessToken;
        (session as any).user.id = token.id;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };