import { connectDB } from "@/app/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Db } from "mongodb";

const handler = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const db: Db | undefined = await connectDB();
                if (!db) {
                    throw new Error("Database connection failed");
                }

                const currentUser = await db.collection("users").findOne({ email: credentials.email });
                if (!currentUser) {
                    return null;
                }

                const passwordMatched = bcrypt.compareSync(credentials.password, currentUser.password);
                if (!passwordMatched) {
                    return null;
                }

                return {
                    id: currentUser._id.toString(),
                    email: currentUser.email,
                    name: currentUser.name
                };
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
});

export { handler as GET, handler as POST };
