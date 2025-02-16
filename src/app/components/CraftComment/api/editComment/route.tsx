import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
    try {

        const body = await request.json()
        const { commentId, comment } = body

        if (!commentId || !comment) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });

        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const commentsCollection = db.collection("comments")
        const result = await commentsCollection.updateOne(
            {_id: new ObjectId(commentId)},
            {
                $set:{
                    "commentData.comment": comment
                }
            }
        )

    } catch (error) {

    }
}