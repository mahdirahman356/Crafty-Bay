import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async(request: NextRequest) => {
     const order = await request.json()
     try {

        const db: Db | undefined = await connectDB()

        if(!db){
            throw new Error("Database connection failed");
        }

        const orderCllection = db.collection("orders")
        const res = await orderCllection.insertOne(order)
        return Response.json(res)
        
     } catch (error) {
        return Response.json({message: "something is wrong"})
     }
}