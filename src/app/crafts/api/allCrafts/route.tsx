/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    try {

        const { searchParams } = new URL(request.url)
        const search = searchParams.get("search")

        console.log(search)

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }
        const postsCollection = db.collection("posts")

        const query = search
        ? {
              $or: [
                  { "postData.craftName": { $regex: search, $options: "i" } },
                  { "postData.title": { $regex: search, $options: "i" } },
                  { "postData.location": { $regex: search, $options: "i" } },
              ],
          }
        : {};
    
        const result = await postsCollection.find(query).toArray()

        if (!result.length) {
            return NextResponse.json({ message: "No posts found" }, { status: 404 });
        }

        return NextResponse.json(result, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}