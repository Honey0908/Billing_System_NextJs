import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import NextAuth, { User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import github from "next-auth/providers/github";  
import bcrypt from 'bcryptjs'

export const {
  auth,
  signIn,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialProvider({
      authorize: async (
        credentials: Partial<Record<"email" | "password", string>>
      ): Promise<User | null>=>{

          const user = await getUserByEmail(credentials.email!);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            credentials.password!,
            user.password,
          );

          if (passwordsMatch) return user;
     
        return null;
      },
    }),
    github,
  ],
  pages: {
    signIn: "/auth/login",
  },
  // callbacks: {
  //   // jwt: async ({ token, user }) => {
  //   //   if (user) {
  //   //     token.role = user.role;
  //   //   }
  //   //   return token;
  //   // },
  //   // session: async({session,token})=>{
  //   //     if(session?.user){
  //   //         session.user.role=token?.role;
  //   //         return session;
  //   //     }
  //   // }
  // },
});
