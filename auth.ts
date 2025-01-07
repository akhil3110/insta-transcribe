import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db"


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({session,user}){

      const existingUser  = await prisma.user.findFirst({
        where: {
          id: user.id
        },
        select: {
          plan: true
        }
      })

      if(existingUser){
        //@ts-ignore
        session.user.plan = existingUser.plan
      }

      return session
    }
  }
}
)