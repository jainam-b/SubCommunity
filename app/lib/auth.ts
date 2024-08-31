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
        // check if user already exists 
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
            },
          });

          return { id: user.id, email: user.email, username: user.name };
        }
        if (user.password && credentials.password) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) {
            return { id: user.id, email: user.email, username: user.name };
          } else {
            // Invalid password
            throw new Error("Invalid email or password");
          }
        } else {
          // If user password is not present or credentials password is missing
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
    async jwt({ user, token }: any) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.uid;
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
            await prisma.user.create({
              data: {
                id: profile.sub,
                email: profile.email,
                name: profile.name,
                image: profile.picture,
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
