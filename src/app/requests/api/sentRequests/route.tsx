import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

    const requestsData = await request.json()
      
    try {

     const db: Db | undefined = await connectDB()
     if(!db){
        throw new Error("Database connection failed");
     }

     const requestCllection = db.collection("requests")   
     const res = await requestCllection.insertOne(requestsData)

     return Response.json(res)
        
    } catch (error) {
        return Response.json({message: "someting is wrong"})
    }

}