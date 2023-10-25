import NextAuth, { AuthOptions, Account, Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/libs/prisma';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials) return null;
        const student = await prisma.students.findFirst({
          where: { email: credentials.email },
          include: { profile: true },
        });
        if (!student) return null;
        const isMatch = await bcrypt.compare(credentials.password, student?.password!);
        if (!isMatch) return null;

        return { email: student?.email, name: student?.name, image: student?.profile?.imageProfile, id: String(student?.id) };
      },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === 'google') {
        console.log(profile);
        await prisma.students.upsert({
          where: { email: profile?.email },
          update: { email: profile?.email, name: profile?.name },
          create: { email: profile?.email!, name: profile?.name!, profile: { create: { imageProfile: profile?.picture! } } },
        });
        return (profile?.email && profile?.email?.endsWith('@students.amikom.ac.id')) || profile?.email?.endsWith('@amikom.ac.id');
      }
      return true;
    },
    async session({ session, token, user }: any) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
