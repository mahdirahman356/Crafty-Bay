/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) => {
       try {

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const {searchParams} = new URL(request.url)
        const search = searchParams.get("search")

        console.log(search)

        const query = search
        ? {
            $or: [
                {"postData.title" : {$regex: search, $options: "i"}},
                {"postData.craftName": {$regex: search, $options: "i"}},
                {"userData.name": { $regex: search, $options: "i" } },
            ]
        }
        : {}

        const craftRequestCollection = db.collection("craftRequests")  
        const result = await craftRequestCollection.find(query).toArray()

        if(!result){
            return  NextResponse.json({message: "No post"}, { status: 404 })
        }

        return NextResponse.json(result, {status: 200})
        
       } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
       }
}