/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/app/lib/connectDB"
import { Db } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = new URL(request.url)
        const search = searchParams.get("search") 

        const db: Db | undefined = await connectDB()

        if (!db) {
            throw new Error("Database connection failed");
        }

        const usersCollection = db.collection("users")
       
        const query = search 
        ? {
           $or: [
              {name: {$regex: search, $options: "i"}}
            ]
        }
        : {}

        const allUsers = await usersCollection.find(query).toArray()

        if (!allUsers) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json(allUsers, { status: 200 })


    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 })
    }
}