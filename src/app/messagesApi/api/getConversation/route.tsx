import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ message: "User id is required" }, { status: 400 })
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const conversationCollection = db.collection('conversation')
        const res = await conversationCollection.find({ "userIds.myId": id }).toArray()

        if (!res) {
            return NextResponse.json({ message: "data is not available" }, { status: 404 })
        }

        return NextResponse.json(res)


    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });

    }
}