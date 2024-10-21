import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export const PUT = async (request: NextRequest) => {

    try {

        const body = await request.json()
        const { postId, updatedData } = body

        if (!postId || !updatedData) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }
        const postsCollection = db.collection('posts')


        const result = await postsCollection.updateOne(
            { _id: new ObjectId(postId) },
            {
                $set: {
                    postData: updatedData
                }
            }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });


    } catch (error) {
        return NextResponse.json({ message: 'Error updating posts', error }, { status: 500 });

    }

}