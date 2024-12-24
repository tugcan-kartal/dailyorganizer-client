import mongoose from "mongoose";

const connectDB=async():Promise<void>=>{
    try {
        const dbUri=process.env.MONGO;
        if(!dbUri){
            throw new Error("MongoDB URI is not defined in the environment variables.");
        }
        await mongoose.connect(dbUri);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Connection to MongoDB failed",error);
        throw new Error("Connection failed!");
    }
}

export default connectDB;