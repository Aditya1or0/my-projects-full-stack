import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define your NextAuth configuration (authOptions)
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // session: {
  //   strategy: "jwt", // Use JWT for sessions (optional depending on your preference)
  // },
};

export default NextAuth(authOptions);
