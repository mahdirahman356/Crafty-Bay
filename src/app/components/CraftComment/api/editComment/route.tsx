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

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'comment not found' }, { status: 404 });
        }

        return NextResponse.json({message: "comment updated successfully"})

    } catch (error) {
        return NextResponse.json({ message: 'Error updating comment', error }, { status: 500 });
    }
}