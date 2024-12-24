import connectDB from "@/lib/connect";
import Users from "@/models/Users";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST=async(request: NextRequest):Promise<NextResponse>=>{
    try {
        await connectDB();
        const {username,email,password}=await request.json();

        if(!username || !email || !password){
            return NextResponse.json({message: "All fields are required!"},{status: 400});
        }

        const existingUser=await Users.findOne({username});
        if(existingUser){
            return NextResponse.json({message: "Username already exists"},{status: 400});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await Users.create({username,email,password: hashedPassword});

        return NextResponse.json({message: "User registered",user: newUser},{status: 201});
    } catch (error) {
        console.error("Error during user creation:", error);
        return NextResponse.json({ message: "An error occurred while registering the user" }, { status: 500 });
    }
}