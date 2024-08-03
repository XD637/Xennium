import NextAuth from 'next-auth';
import 'dotenv/config';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import { findUserByUsernameOrEmail } from '../../../lib/userUtils';
import { verifyPassword } from '../../../lib/authUtils';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await findUserByUsernameOrEmail(credentials.identifier);
        if (!user) {
          throw new Error('Email or username doesn\'t exist!');
        }
        const isPasswordValid = await verifyPassword(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Incorrect password!');
        }
        // Return user with username included
        return { id: user._id, email: user.email, username: user.username };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      // Add username to session
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add username to token
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
