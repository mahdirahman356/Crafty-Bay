import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
  }

export const DELETE = async(request: NextRequest,  {params}: { params: Params }) => {
     const db: Db | undefined = await connectDB()
     if(!db){
        throw new Error("Database connection failed");
     }

     const postsCollection = db.collection("posts")

     try {
        const postId = new ObjectId(params.id)
        const deletePost = postsCollection.deleteOne({_id: postId})
        if(!deletePost){
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json( { message: "Post deleted" }, { status: 200 } );
     } catch (error) {
        return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
     }
}