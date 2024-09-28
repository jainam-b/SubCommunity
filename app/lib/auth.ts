import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: credentials.name,
              publishName: credentials.publishName
            },
          });
          return { id: user.id, email: user.email, name: user.name, publishName: user.publishName };
        }
        if (user.password && credentials.password) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) {
            return { id: user.id, email: user.email, name: user.name, publishName: user.publishName };
          } else {
            throw new Error("Invalid email or password");
          }
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.uid = user.id;
        token.publishName = user.publishName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.uid;
        session.user.publishName = token.publishName;
      }
      return session;
    },
    async signIn({ user, account, profile }: any) {
      if (account.provider === "google") {
        if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
          let user = await prisma.user.findUnique({
            where: { email: profile.email },
          });
          if (!user) {
            user = await prisma.user.create({
              data: {
                id: profile.sub,
                email: profile.email,
                name: profile.name,
                image: profile.picture,
                publishName: profile.name // Using name as publishName for Google sign-in
              },
            });
          }
          return true;
        }
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
};