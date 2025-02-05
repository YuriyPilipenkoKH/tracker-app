import NextAuth, {  Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: import.meta.env.NEXTAUTH_SECRET, // Optional secret for JWT
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
