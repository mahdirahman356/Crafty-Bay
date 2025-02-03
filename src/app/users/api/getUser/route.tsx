import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {


        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        const userIdString = searchParams.get("userIds")
        const userIds = userIdString ? userIdString.split(',') : []

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }
        const usersCollection = db.collection("users")

        if (id) {

            const user = await usersCollection.findOne({ _id: new ObjectId(id) })

            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 })
            }
            return NextResponse.json(user, { status: 200 })

        }

        if(userIds.length > 0){
            const objectIds = userIds.map((id: string) => new ObjectId(id))
            const users = await usersCollection.find({_id: {$in: objectIds}}).toArray()
            if (!users) {
                return NextResponse.json({ message: "User not found" }, { status: 404 })
            }
            return NextResponse.json(users, { status: 200 })
        }

        return NextResponse.json({ message: "User ID or User IDs are required" }, { status: 400 });


    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}