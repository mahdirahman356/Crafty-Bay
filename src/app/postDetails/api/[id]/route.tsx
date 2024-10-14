import { connectDB } from "@/app/lib/connectDB";
import { Db, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    id: string;
  }

export const GET = async(request: NextRequest, {params}: { params: Params }) => {
    const db: Db | undefined = await connectDB()
    if (!db) {
        throw new Error("Database connection failed");
      }

      const postsCollection = db.collection("posts")

      try {
        const postId = new ObjectId(params.id); 
        const post = await postsCollection.findOne({ _id: postId });
        if (!post) {
          return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json( post );
      } catch (error) {
        return NextResponse.json({ message: "Error fetching post" }, { status: 500 });

      }
}