export const runtime = 'nodejs'

import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
 
interface User {
  userId: string;
  userName: string;
  password: string;
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
      name: "Credentials",
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },authorize: async (credentials) => {
        if (!credentials?.userName || !credentials?.password) {
          throw new InvalidLoginError()
        };

        const adminDataRaw = Buffer.from(process.env.ADMIN_DATA || '', 'base64').toString('utf-8');
        if (!adminDataRaw) return null;

        try {
          const data = JSON.parse(adminDataRaw);
          const user = data.admin.find(
            (u: User) => 
              u.userName === credentials.userName);

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (isPasswordCorrect) {
              return { id: user.userId, name: user.userName };
            }
          }
        } catch (error) {
          console.error("Auth error:", error);
        }
        return null;
      },
    }),
  ],callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith("/admin");
      
      if (isOnAdminPanel) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
});