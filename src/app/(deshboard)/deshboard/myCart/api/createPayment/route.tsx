import { connectDB } from "@/app/lib/connectDB";
import axios from "axios";
import { Db, ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import qs from 'qs';
export const POST = async (request: NextRequest) => {

    const paymentInfo = await request.json()

    const trxId = new ObjectId().toString()

    const initiateData = {
        store_id: "mahdi6762a96b29d33",
        store_passwd: "mahdi6762a96b29d33@ssl",
        total_amount: paymentInfo.amount * paymentInfo.quantity,
        currency: "BDT",
        tran_id: trxId,
        success_url: "http://localhost:3000/deshboard/myCart/api/successPayment",
        fail_url: "http://localhost:3000/deshboard/myCart/api/failPayment",
        cancel_url: "http://localhost:3000/deshboard/myCart/api/cancelPayment",
        cus_name: paymentInfo.cus_name,
        cus_email: paymentInfo.cus_email,
        cus_add1: paymentInfo.cus_add,
        cus_add2: paymentInfo.cus_add,
        cus_city: paymentInfo.cus_add,
        cus_postcode: 1000,
        cus_country: "Bangladesh",
        cus_phone: paymentInfo.cus_phone,
        shipping_method: "NO",
        product_name: paymentInfo.product_name,
        product_category: "craft",
        product_profile: "general",
        multi_card_name: "mastercard, visacard, amexcard",
        value_a: "ref001_A&",
        value_b: "ref002_B&",
        value_c: "ref003_C&",
        value_d: "ref004_D"
    };
    console.log(paymentInfo.amount)

    try {

        const response = await axios({
            method: "POST",
            url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            data: qs.stringify(initiateData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        console.log("SSLCommerz Response:", qs.parse(response.data))

        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
        }

        const saveData = {
            paymentId: trxId,
            amount: paymentInfo.amount,
            quantity: paymentInfo.quantity,
            status: "panding",
            cus_name: paymentInfo.cus_name,
            cus_email: paymentInfo.cus_email,
            cus_address: paymentInfo.cus_add,
            cus_phone: paymentInfo.cus_phone,
            cartId: paymentInfo.cartId,
            productId: paymentInfo.productId,
            product_name: paymentInfo.product_name,
            category: paymentInfo.category,
            date: new Date()
        }

        const paymentsCollection = db.collection("payments")
        const ordersCollection = db.collection("orders")
        const res = await paymentsCollection.insertOne(saveData)
        const deleteCartItem = await ordersCollection.deleteOne({ _id: new ObjectId(paymentInfo.cartId) })

        if (res && deleteCartItem) {
            return Response.json(response.data.GatewayPageURL)
        }

    } catch (error) {
        return Response.json({
            message: "something is wrong"
        })
    }
}