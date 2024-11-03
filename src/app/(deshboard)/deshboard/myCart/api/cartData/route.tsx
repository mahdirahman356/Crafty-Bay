import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) => {
     try {

        const {searchParams} = new URL(request.url)
        const email = searchParams.get("email")

        if(!email){
           return NextResponse.json({message: "Email is required"}, {status: 400})
        }

        const db: Db | undefined = await connectDB()
        if(!db){
            throw new Error("Database connection failed");
        }

        const orderCollection = db.collection("orders");
        const orders = await orderCollection.find({ userEmail: email }).toArray();

        if(!orders){
            return NextResponse.json({message: "order is not available"}, {status: 404})
        }

        return NextResponse.json(orders, {status: 200})
        
     } catch (error) {
        return NextResponse.json({message: "Internal server error", error})
     }
}