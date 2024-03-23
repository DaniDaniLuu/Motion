import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: String;
  }
  interface Session {
    user: User & {
      address: string;
    };
    token: {
      username: string;
    };
  }
}
