import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";

export const POST = async(request: NextRequest) => {

    const craftRequestsPost = await request.json()

      try {
        const db: Db | undefined = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
          }

          const craftRequestsPostCollection = db.collection("craftRequests")
          const res = await craftRequestsPostCollection.insertOne(craftRequestsPost)
          return Response.json(res)

      } catch (error) {
        return Response.json({
            message: "something is wrong"
         })
      }
}