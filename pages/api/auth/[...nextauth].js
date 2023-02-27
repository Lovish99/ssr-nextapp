import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { validateAllOnce } from "@/utils/common";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      //?
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        //    const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        try {
          const { email, password } = credentials;

          validateAllOnce({ email, password });

          const res = await fetch(
            "https://63f7496be8a73b486af48628.mockapi.io/user",
            {
              method: "GET",
              headers: { "content-type": "application/json" },
            }
          ).then((res) => {
            if (res.ok) {
              return res.json();
            }
          });

          let user = {};

          Object.keys(res).map((id, index) => {
            if (res[id].email === email && res[id].password === password) {
              user = res[id];
            }
          });

          // const isMatched = bcrypt.compare(password, user.password);

          if (Object.keys(user).length > 0) {
            delete user.password;
            // Any object returned will be saved in `user` property of the JWT

            return user;
          } else {
            // If you return null or false then the credentials will be rejected
            // return null;
            // You can also Reject this callback with an Error or with a URL:
            // throw new Error('error message') // Redirect to error page
            // throw '/path/to/redirect'        // Redirect to a URL
            throw new Error("Email or password incorrect");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user.id) {
        token.id = user.id;
      }
      return token;
    },
  },
});
