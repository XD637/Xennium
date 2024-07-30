import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import { findUserByEmail, createUser } from '../../../lib/userUtils';
import { verifyPassword } from '../../../lib/authUtils'; // Assuming verifyPassword is in authUtils

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await findUserByEmail(credentials.email);
        if (user && await verifyPassword(credentials.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        let existingUser = await findUserByEmail(user.email);

        if (!existingUser) {
          // If the user does not exist, create a new user
          existingUser = await createUser({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }

        // Check if the account is properly linked
        if (existingUser) {
          return true;
        }
        return false;
      }
      return true;
    },
    async session({ session, user }) {
      if (user) {
        session.user = user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt', // Use JWT strategy
  },
});
