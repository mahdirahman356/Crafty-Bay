import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const senderId = searchParams.get("senderId")
        const receiverId = searchParams.get("receiverId");


        if (!senderId && !receiverId) {
            return NextResponse.json({ message: "id is required" }, { status: 400 })
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const messageCollection = db.collection("message")
        const res = await messageCollection.find({senderId: senderId, conversationId: receiverId}).sort({ createdAt: 1 }).toArray()

          return NextResponse.json(res, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "something is wrong" })
    }
}