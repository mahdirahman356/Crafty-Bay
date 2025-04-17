import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        const session = await getServerSession(authOptions)
      
        const db: Db | undefined = await connectDB()
        if(!db) {
            throw new Error("Database connection failed");
        }

        const postsCollection = db.collection("posts")
        const ordersCollection = db.collection("orders") 
        const paymentsCollection = db.collection("payments")

        const products = await postsCollection.countDocuments({email: session?.user?.email})
        const orders = await ordersCollection.countDocuments({"sellerData.email": session?.user?.email})
        const sellerProducts = await postsCollection.find({email: session?.user?.email}).toArray()

        if(!sellerProducts || sellerProducts.length === 0){
            return NextResponse.json({ products: 0, orders: 0, revenue: 0 }, { status: 200 });
        }

        const sellerProductIds = sellerProducts.map(pro => pro._id.toString());

        const sellerPayment = await paymentsCollection.find({
          productId: { $in: sellerProductIds },
          status: "Success"
        }).toArray();

       
        const revenue = sellerPayment.reduce((total, payment) => total + (payment.amount * payment.quantity), 0)


        return NextResponse.json({products, orders, revenue}, {status: 200})

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}

