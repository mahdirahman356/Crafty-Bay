import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT =async (request: NextRequest) => {
    const session = await getServerSession(authOptions)

    if(!session){
      return NextResponse.json({message: "Unauthorized", status: 401})
    }

    try {

        const body = await request.json();

        const {email,  updatedData } = body

        if(!email || !updatedData){
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
         }

         const db: Db | undefined = await connectDB()
     if (!db) {
        throw new Error("Database connection failed");
      }

      const usersCollection = db.collection("users")  
      const result = await usersCollection.updateOne(
          { email },
          { $set: updatedData }
      )

      if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });

        
    } catch (error) {
        return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });

    }

}
