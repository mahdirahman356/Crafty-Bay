import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const senderId = searchParams.get("senderId")
        const conversationId = searchParams.get("conversationId")


        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const messageCollection = db.collection('message')


        if (senderId) {
            const res = await messageCollection.find({ senderId: senderId }).toArray()

            if (!res) {
                return NextResponse.json({ message: "data is not available" }, { status: 404 })
            }
            return NextResponse.json(res)
        }

        if(conversationId){
            const res = await messageCollection.find({ conversationId : conversationId }).toArray()

            if (!res) {
                return NextResponse.json({ message: "data is not available" }, { status: 404 })
            }
            return NextResponse.json(res)
        }

        return NextResponse.json({ message: "sender ID or conversation IDs are required" }, { status: 400 });



    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });

    }
}