import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const postsCollection = db.collection("posts")
        const ordersCollection = db.collection("orders") 
        const usersCollection = db.collection("users")
        const paymentsCollection = db.collection("payments")

        const products = await postsCollection.estimatedDocumentCount()
        const orders = await ordersCollection.estimatedDocumentCount()
        const customers = await usersCollection.countDocuments({role: "buyer"})
        const payments = await paymentsCollection.find({status: "Success"}).toArray()

        const revenue = payments.reduce((total, payment) => total + payment.amount, 0)

        return NextResponse.json({revenue, products, orders, customers}, {status:200})
         
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }

}