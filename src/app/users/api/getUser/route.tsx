import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 })
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }
        const usersCollection = db.collection("users")
        const user = await usersCollection.findOne({ _id: new ObjectId(id) })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        return NextResponse.json(user, { status: 200 })


    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}