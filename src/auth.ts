import NextAuth, {  Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { getEnv } from './lib/dotEnv';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: getEnv().VITE_GOOGLE_CLIENT_ID,
      clientSecret: getEnv().VITE_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: getEnv().VITE_GITHUB_CLIENT_ID,
      clientSecret: getEnv().VITE_GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: import.meta.env.VITE_NEXTAUTH_SECRET, // Optional secret for JWT
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (session.user) {
        if (token?.id) {
          session.user.id = token.id as string;
        }
        if (token?.role) {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
