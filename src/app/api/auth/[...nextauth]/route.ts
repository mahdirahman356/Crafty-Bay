/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestInternal, Awaitable, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const hendler = NextAuth({ session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
     },
     providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            authorize: function (credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Awaitable<User | null> {
                return true
            }
        })
     ],
     callbacks: {},
     pages: {
        signIn: "/login"
     }
})

export {hendler as GET, hendler as POST}