import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const allowedAdmins = ["derrickmugisha169@gmail.com"]; // Change this to your admin email
      return allowedAdmins.includes(user.email!);
    },
  },
});

export { handler as GET, handler as POST };