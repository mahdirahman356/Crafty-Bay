import { connectDB } from "@/app/lib/connectDB";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const db: Db | undefined = await connectDB();
        if (!db) {
            throw new Error("Database connection failed");
        }

        const requestCollection = db.collection("requests");
        const friendsCollection = db.collection("friends");

        const sentRequests = await requestCollection.find({ "requestFrom.userEmail": email, status: "friends" }).toArray();
        const receivedRequests = await requestCollection.find({ "sentRequestTo.userEmail": email, status: "friends" }).toArray();

        const allRequests = [...sentRequests, ...receivedRequests];

        if (allRequests.length > 0) {
            await friendsCollection.insertMany(allRequests);

            const requestIds = allRequests.map(req => req._id);
            await requestCollection.deleteMany({ _id: { $in: requestIds } });
        }

        return NextResponse.json({ message: "Requests moved to friends collection successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};
