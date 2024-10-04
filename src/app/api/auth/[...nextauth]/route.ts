import { connectDB } from "@/app/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Db } from "mongodb";
import GoogleProvider from "next-auth/providers/google";
import { Account, AuthOptions, User } from "next-auth";

export const authOptions: AuthOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
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
                    name: currentUser.name,
                    role: currentUser.role
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ""
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async signIn({ user, account }: { user: User; account: Account | null }) {
            if (account?.provider === "google") {
                const { email } = user
                try {
                    const db: Db | undefined = await connectDB();
                    if (!db) {
                        throw new Error("Database connection failed");
                    }
                    const usersCollection = db.collection("users")
                    const exist = await usersCollection.findOne({ email: email })
                    if (!exist) {
                        await usersCollection.insertOne(user);
                    }

                    return true;
                } catch (error) {
                    console.log(error)
                    return false;
                }
            } else {
                return true
            }
        },


        async jwt({account, user, token, trigger, session}) {
            if(account){
                token.role = (user as { role?: string }).role;
                return token
            }
            if(trigger === "update"){
                return {...token, ...session.user}
            }
            return {...token, ...user};
        },

        async session({session, token}){
            const userWithRole = {
                ...session.user,
                role: token.role as string | undefined
            };
        
            session.user = userWithRole; 
            return session
        }
    }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
