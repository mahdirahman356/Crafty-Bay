import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        const session = await getServerSession(authOptions)
      
        const db: Db | undefined = await connectDB()
        if(!db) {
            throw new Error("Database connection failed");
        }

        const postsCollection = db.collection("posts")
        const ordersCollection = db.collection("orders") 


        const products = await postsCollection.countDocuments({email: session?.user?.email})
        const orders = await ordersCollection.countDocuments({"sellerData.email": session?.user?.email})

        return NextResponse.json({products, orders}, {status: 200})

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}