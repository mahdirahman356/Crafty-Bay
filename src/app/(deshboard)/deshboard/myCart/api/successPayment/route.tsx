import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';

export const POST = async (request: NextRequest) => {
       try {
              const formData = await request.text();
              const successData = qs.parse(formData); // Parse the form data

              console.log("Success Payment Data:", successData);

              if (successData.status !== "VALID") {
                     throw new Error("Unauthorized Payment , Invalid Payment")
              }

              const db: Db | undefined = await connectDB()

              if (!db) {
                     throw new Error("Database connection failed")
              }

              const paymentsCollection = db.collection("payments")
              const ordersCollection = db.collection("orders")
              const update = await paymentsCollection.updateOne(
                     { paymentId: successData.tran_id },
                     {
                            $set: {
                                   status: "Success"
                            }
                     })

              if (update.matchedCount === 0) {
                     return NextResponse.json({ message: "payment data not found" })
              }

              const paymentDetails = await paymentsCollection.findOne({ paymentId: successData.tran_id })
              if (paymentDetails && paymentDetails.cartId) {
                     const deleteCartItem = await ordersCollection.deleteOne({ _id: new ObjectId(paymentDetails.cartId) })
                     console.log("Deleted order item:", deleteCartItem)
              } else {
                     console.warn("Could not identify order items to delete based on payment data.");
              }

              const redirectUrl = new URL('/deshboard/successPayment', "http://localhost:3000")
              return NextResponse.redirect(redirectUrl.toString(), 302)

       } catch (error) {
              console.error("Error processing payment:", error);
              return NextResponse.json({ error: "Internal server error" }, { status: 500 });
       }
};