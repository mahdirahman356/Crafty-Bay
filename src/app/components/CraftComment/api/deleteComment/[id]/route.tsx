import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
}

export const DELETE = async (request: NextRequest, { params }: { params: Params }) => {
    try {

        const commentId = new ObjectId(params.id)

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const commentsCollection = db.collection('comments')
        const deleteComment = commentsCollection.deleteOne({ _id: commentId })

        if (!deleteComment) {
            return NextResponse.json({ message: "Not found" }, { status: 404 })
        }

        return NextResponse.json({message:"comment deleted"}, {status: 200})

    } catch (error) {
        return NextResponse.json({ message: "Error Delete comments" }, { status: 500 })
    }
}