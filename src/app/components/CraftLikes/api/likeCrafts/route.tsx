import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {

        const likesData = await request.json()

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const likesCollection = db.collection('likes')
        const res = await likesCollection.insertOne(likesData)

        return NextResponse.json(res);

    } catch (error) {
        return NextResponse.json({ message: "something is wrong" })
    }
} 