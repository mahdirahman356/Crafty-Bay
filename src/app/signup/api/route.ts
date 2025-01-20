
import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";


export const POST = async(request: NextRequest) => {
      const newUser = await request.json();
      console.log(newUser)
      try {
        const db: Db | undefined  = await connectDB()
        if (!db) {
            throw new Error("Database connection failed");
          }
        const usersCollection = db.collection("users")
        const exist = await usersCollection.findOne({email: newUser.email})
        if(exist){
            return Response.json({message: "User Exists"})
        }
        const hashPassword = bcrypt.hashSync(newUser.password, 14);
        const res = await usersCollection.insertOne({...newUser, password: hashPassword})
        return Response.json(res)
      } catch (error) {
         return Response.json({
            message: "something is wrong"
         })
      }
}