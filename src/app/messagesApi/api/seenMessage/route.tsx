import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (requests: NextRequest) => {
    try {

        const { searchParams } = new URL(requests.url)
        const senderId = searchParams.get("senderId")
        const receiverId = searchParams.get("receiverId");

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const messageCollection = db.collection("message")

        const result = await messageCollection.updateMany(
            { senderId: senderId, conversationId: receiverId},
            { $set: { seenIds: [senderId, receiverId] } }
        )
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'message not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Seen ids updated successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "something is wrong" })
    }
}