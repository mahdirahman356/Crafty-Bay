import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {

        const likesData = await request.json()
        const {postId, userData} = likesData

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const likesCollection = db.collection('likes')
        const existingLike = await likesCollection.findOne({postId, "userData.userId": userData.userId})
        if(existingLike){
           return NextResponse.json({message: "Already liked"}, {status: 400}) 
        }
        const res = await likesCollection.insertOne(likesData)

        return NextResponse.json(res);

    } catch (error) {
        return NextResponse.json({ message: "something is wrong" })
    }
} 