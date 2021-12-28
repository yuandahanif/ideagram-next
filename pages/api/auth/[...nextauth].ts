import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: "12iB3bEj+35vZiRePT1tFZtzIAJJAIaYWxHoM9u8Bxc=",
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/signout",
    newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // id: "login-api",
      name: "Login",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "Password" },
      },
      async authorize(credentials, req) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const data = await fetch(
            (process.env.NEXT_PUBLIC_API_ENDPOINT as string) + "auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const json = await data.json();
          const { access_token, user } = json;

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            user.access_token = access_token;
            return user;
          } else {
            // If you return null or false then the credentials will be rejected
            return false;
            // You can also Reject this callback with an Error or with a URL:
            // throw new Error("error message") // Redirect to error page
            // throw "/path/to/redirect"        // Redirect to a URL
          }
        } catch (error: any) {
          // return false;
          throw new Error(error.message); // Redirect to error page
        }
      },
    }),
  ],
  jwt: {
    // A secret to use for key generation. Defaults to the top-level `secret`.
    secret: "7LSazoFL3ioXCra7i3AGxHzZT9vMyQFa6GgAvMEP9Vwd",
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.access_token = user.access_token;
        user.access_token = null;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.access_token = token.access_token;
      session.user = token.user as any;
      return session;
    },
  },
});
