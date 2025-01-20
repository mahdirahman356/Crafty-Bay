/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    try {

        const { searchParams } = new URL(request.url)
        const search = searchParams.get("search")
        const sort = searchParams.get("sort")
        console.log(search, sort)

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
                    { "userData.name": { $regex: search, $options: "i" } },
                ],
            }
            : {};

            let sortOption = {}
            if(sort === "priceLowHigh"){
                sortOption = {"postData.price": 1}
            }else if (sort === "priceHighLow") {
                sortOption = {"postData.price": -1}
            }

        const result = await postsCollection.find(query).sort(sortOption).toArray()

        if (!result.length) {
            return NextResponse.json({ message: "No posts found" }, { status: 404 });
        }

        return NextResponse.json(result, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}