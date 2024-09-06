import NextAuth, { AuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

interface CustomToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

interface CustomSession extends Session {
  accessToken?: string;
}

interface RefreshedTokens {
  access_token: string;
  expires_in: number;
}

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

const refreshAccessToken = async (refreshToken: string): Promise<RefreshedTokens> => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  return response.json();
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid https://www.googleapis.com/auth/spreadsheets',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: CustomToken; account: any }): Promise<CustomToken> {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + (account.expires_in ?? 0) * 1000;
        return token;
      }

      if (token.expiresAt && Date.now() < token.expiresAt) {
        return token;
      }

      if (token.refreshToken) {
        try {
          const refreshedTokens = await refreshAccessToken(token.refreshToken);
          token.accessToken = refreshedTokens.access_token;
          token.expiresAt = Date.now() + refreshedTokens.expires_in * 1000;
          return token;
        } catch (error) {
          throw new Error('Failed to refresh access token');
        }
      }

      return token;
    },
    async session({ session, token }: { session: CustomSession; token: CustomToken }): Promise<CustomSession> {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
