import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server"

interface Params {
    id: string;
}

export const DELETE = async (request: NextRequest, { params }: { params: Params }) => {
    try {

        const messageId = new ObjectId(params.id)

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }
        const messageCollection = db.collection('message')
        const deleteMessage = messageCollection.deleteOne({_id: messageId})

        if(!deleteMessage){
            return NextResponse.json({message: "Not found"}, {status: 404})
        }

        return NextResponse.json({message: "Message Deleted"}, {status: 200})

    } catch (error) {
        return NextResponse.json({ message: "Error Delete Items" }, { status: 500 })
    }
}