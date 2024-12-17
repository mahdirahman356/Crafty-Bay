import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
interface Params {
    id: string;
  }
export const DELETE = async(request: NextRequest, {params}: {params: Params}) => {
      
    const db: Db | undefined = await connectDB()
    if(!db){
        throw new Error("Database connection failed");
    }

    const ordersCollection = db.collection("orders")

    try {

        const orderId = new ObjectId(params.id)

        const deleteOrderItem = await ordersCollection.deleteOne({_id: orderId})

        if(!deleteOrderItem){
            return NextResponse.json({message: "Not found"}, {status: 404})
        }

        return NextResponse.json({message: "Item Deleted"}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({message: "Error fetching post"}, {status: 500})
    }

} 