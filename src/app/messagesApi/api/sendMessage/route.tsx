import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async(request: NextRequest) => {
    
     const messageData = await request.json()  
     console.log(messageData) 
     try {
     
    const db: Db | undefined = await connectDB()
    if(!db){
        throw new Error("Database connection failed");
    }    

    const messageCollection = db.collection("message")
    const res = await messageCollection.insertOne(messageData)

    return Response.json(res)

        
     } catch (error) {
        return Response.json({message: "something is wrong"})
     }
}