// import { connectDB } from "@/app/lib/connectDB";
import axios from "axios";
// import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

    const paymentInfo = await request.json()

    const initiateData = {
        store_id: "mahdi6762a96b29d33",
        store_passwd: "mahdi6762a96b29d33@ssl",
        total_amount: paymentInfo.amount,
        currency: "BDT",
        tran_id: "REF123",
        success_url: "http://localhost:3000/deshboard/myCart/api/successPayment",
        fail_url: "http://yoursite.com/fail.php&",
        cancel_url: "http://yoursite.com/cancel.php&",
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
        // const db: Db | undefined = await connectDB()
        // if (!db) {
        //     throw new Error("Database connection failed");
        // }

        const response = await axios({
            method: "POST",
            url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            data: initiateData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        console.log("SSLCommerz Response:", response.data)

        return Response.json(response.data.GatewayPageURL)

        // const paymentsCollection = db.collection("payments")
        // const res = await paymentsCollection.insertOne()



    } catch (error) {
        return Response.json({
            message: "something is wrong"
         })
    }
}