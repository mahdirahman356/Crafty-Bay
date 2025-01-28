import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
    try {

        const body = await request.json()
        const {id} = body

        if(!id) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        const db: Db | undefined = await connectDB()
        if(!db){
            throw new Error("Database connection failed");
        }

        const requestCollection = db.collection("requests")
        const result = await requestCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {status: "friends", date: new Date()}}
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'status updated successfully' }, { status: 200 });

 
    } catch (error) {
        return NextResponse.json({ message: 'Error updating', error }, { status: 500 });
    }
}