import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {

    try {

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed")
        }

        const paymentsCollection = db.collection('payments')

        const result = await paymentsCollection.aggregate([
            {
                $match: {
                    status: "Success"
                }
            },
            {
                $group: {
                    _id: "$category",
                    quantity: { $sum: "$quantity" },
                    revenue: { $sum: { $multiply: ["$amount", "$quantity"] } }
                }
            },
            {
                $project:{
                    _id: 0,
                    category: "$_id",
                    quantity: 1,
                    revenue: 1,
                }
            }
        ]).toArray()

        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}