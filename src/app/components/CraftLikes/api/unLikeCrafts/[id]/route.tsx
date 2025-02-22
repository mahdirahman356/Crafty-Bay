import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server"
interface Params {
    id: string;
}
export const DELETE = async (request: NextRequest, { params }: { params: Params }) => {
    try {

        const id = new ObjectId(params.id)

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const likesCollection = db.collection('likes')
        const unLike = await likesCollection.deleteOne({_id: id})

        if(!unLike){
            return NextResponse.json({ message: "Not found" }, { status: 404 })
        }

        return NextResponse.json({message: "Like Removed"}, {status: 200})


    } catch (error) {
        return NextResponse.json({ message: "Error unlike" }, { status: 500 })
    }
}