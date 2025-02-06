import { AuthOptions, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Refresh the access token from backend using the refresh token.
 * @param token The token object
 * @returns The refreshed token object
 */
async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/refreshs`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedToken = await response.json();

    if (!response.ok) {
      throw refreshedToken;
    }

    return {
      ...token,
      accessToken: refreshedToken.accessToken,
      expiresIn: refreshedToken.expiresIn,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@placeholder.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;
          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await response.json();

          if (response.status === 200 && user) {
            // Save the successful login details to the JWT
            return user;
          } else {
            // Return null that will display an error advising user to check their credentials
            return null;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /**
     * Refresh the access token when needed.
     * @param token The token object
     */
    async jwt({ token, user }) {
      if (token && user) {
        // Initial login
        return { ...token, ...user };
      }
      const accessTokenExpiresAt = token.iat + token.expiresIn;
      const currentTime = Math.floor(Date.now() / 1000);
      if (accessTokenExpiresAt > currentTime) {
        return { ...token };
      }
      return refreshAccessToken(token);
    },

    /**
     * Set the token to the session so its available on the client.
     */
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (token.error) {
        session.error = String(token.error);
      }
      return session;
    },
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
