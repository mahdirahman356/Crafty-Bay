import { connectDB } from "@/app/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const postId = searchParams.get("postId")

        const db = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const likesCollection = db.collection("likes")
        const res = await likesCollection.find({ postId: postId }).toArray()

        if (!res) {
            return NextResponse.json({ message: "likes not found" }, { status: 404 })
        }

        return NextResponse.json(res, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}