import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const senderId = searchParams.get("senderId")
        const receiverId = searchParams.get("receiverId");


        if (!senderId) {
            return NextResponse.json({ message: "id is required" }, { status: 400 })
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const messageCollection = db.collection("message")
        const res = await messageCollection.find({senderId: senderId, conversationId: receiverId}).sort({ createdAt: 1 }).toArray()

        if (!res || res.length === 0) {
            return NextResponse.json({ message: "No messages found for this conversation" }, { status: 404 });
          }

        return NextResponse.json(res);

    } catch (error) {
        return NextResponse.json({ message: "something is wrong" })
    }
}