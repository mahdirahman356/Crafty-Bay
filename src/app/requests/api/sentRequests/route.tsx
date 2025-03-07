import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

    const sentRequestsData = await request.json()
      
    try {

     const db: Db | undefined = await connectDB()
     if(!db){
        throw new Error("Database connection failed");
     }

     const requestCollection = db.collection("requests")   
     const res = await requestCollection.insertOne(sentRequestsData)

     return Response.json(res)      

    } catch (error) {
        return Response.json({message: "someting is wrong"})
    }

}