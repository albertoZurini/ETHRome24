import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        if (typeof token.email === 'string') {
          session.user.email = token.email; 
        }
      }
      return session;
    },
    async jwt({ token, account }): Promise<any> {
      if (account && 'email' in account) {
        token.email = account.email as string;
      }
      return token;
    },
  },
};

console.log("=====", process.env)

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
