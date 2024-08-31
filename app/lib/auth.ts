import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // Check if the user exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user exists, verify password
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email, username: user.name };
        }

        // If user does not exist or password does not match
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
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
    async signIn({ account, profile, credentials }: { account: any; profile: any; credentials: any }) {
      if (account.provider === "google") {
        // Create or update user in database
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
      } else if (credentials) {
        // Handle sign-up logic
        const { email, password } = credentials;

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Hash the password before storing
          const hashedPassword = await bcrypt.hash(password, 12);

          await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });

          return { email };
        }
        
        // If user already exists
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin"
  }
};
