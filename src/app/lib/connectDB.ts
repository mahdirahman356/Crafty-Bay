
import { Db, MongoClient, ServerApiVersion } from "mongodb";

let db: Db | undefined;
export const connectDB = async():Promise<Db | undefined> => {
    if(db) return db
    const uri: string | undefined = process.env.MONGODB_URI
    console.log('MongoDB URI:', uri);
    if(!uri){
        console.log("MongoDB URI is not defined.")
        return undefined
    }
    try {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })

        db = client.db("crafty-bay")
    } catch (error) {
        console.log(error)
    }
}