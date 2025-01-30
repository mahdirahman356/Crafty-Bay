import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async(request: NextRequest) => {
    const post = await request.json()
    try {

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
          }

          const postsCollection = db.collection("posts")

        const res = await postsCollection.insertOne(post)
        return Response.json(res)
    } catch (error) {
        return Response.json({
            message: "something is wrong"
         })
    }
} 