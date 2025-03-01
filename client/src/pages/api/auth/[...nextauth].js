import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default NextAuth.default({
  // Configure one or more authentication providers
  providers: [
    GithubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        // params: { scope: "read:user repo" },
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "repo user" },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
// export default NextAuth(authOptions);
