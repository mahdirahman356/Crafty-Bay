import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server"
interface Params {
    id: string;
  }

export const DELETE = async (request:NextRequest, {params}: {params: Params}) => {
    try {

        const _id = new ObjectId(params.id)

        const db: Db | undefined = await connectDB()

            if(!db){
                throw new Error("Database connection failed");
            }
        
            const requestsCollection = db.collection("requests")
            const cancleRequest = await requestsCollection.deleteOne({_id: _id})

            if(!cancleRequest){
                return NextResponse.json({message: "Not found"}, {status: 404})
            }

            return NextResponse.json({message: "Item Deleted"}, {status: 200})

    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 })
    }
}