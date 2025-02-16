import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {

        const commentData = await request.json()

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const commentsCollection = db.collection("comments")
        const res = await commentsCollection.insertOne(commentData)
        
        return NextResponse.json(res);

    } catch (error) {
        return NextResponse.json({message: "something is wrong"})
    }
}