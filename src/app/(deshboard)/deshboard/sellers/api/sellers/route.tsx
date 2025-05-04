import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed")
        }

        const usersCollection = db.collection("users")
        const postsCollection = db.collection("posts")
        const ordersCollection = db.collection("orders")
        const paymentsCollection = db.collection("payments")

        const sellers = await usersCollection.find({ role: "seller" }).toArray()

        const sellersData = []

        for (const seller of sellers) {
            const sellerEmail = seller.email

            const productsCount = await postsCollection.countDocuments({ email: sellerEmail })
            const ordersCount = await ordersCollection.countDocuments({ "sellerData.email": sellerEmail })
            const sellerProducts = await postsCollection.find({ email: sellerEmail }).toArray()


            const sellerProductIds = sellerProducts.map((ids) => ids._id.toString());
     
            const sellerPayment = await paymentsCollection.find({
                productId: {$in: sellerProductIds},
                status: "Success"
            }).toArray()

            const totalRevenue = sellerPayment.reduce((total, payments) => total + (payments.amount * payments.quantity), 0)


            sellersData.push({
                user: seller,
                products: productsCount,
                orders: ordersCount,
                revenue: totalRevenue
            })

        }


        return NextResponse.json(sellersData, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error })
    }
}