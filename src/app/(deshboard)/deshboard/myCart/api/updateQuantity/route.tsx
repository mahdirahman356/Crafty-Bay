import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
      try {

        const body = await request.json()
        const {orderId, UpdateQuantity} = body

        if(!orderId || !UpdateQuantity){
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const ordersCollection = db.collection('orders')

        const result = await ordersCollection.updateOne(
            { _id: new ObjectId(orderId) },
            {$set: { 'orderData.quantity': UpdateQuantity }}
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'quantity updated successfully' }, { status: 200 });


        
      } catch (error) {
        return NextResponse.json({ message: 'Error updating', error }, { status: 500 });
      }
}