import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
    try {

        const body = await request.json()
        const { postId, commentData } = body

        if (!postId || !commentData) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const postsCollection = db.collection("posts")
        const result = await postsCollection.updateOne(
            { _id: new ObjectId(postId) },
            {
                $push: {
                    commentData: commentData
                }
            }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Comment Added Successfully' }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ message: "Error Adding Comment", error })
    }
}