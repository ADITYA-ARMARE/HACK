import mongoose from "mongoose";
import dns from 'node:dns';
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function  connectDB(){
    try {
       await mongoose.connect(process.env.MONGO_URI as string);
       console.log("MONGODB IS CONNECTED ☑️")
    } catch (error:unknown) {
        if(error instanceof Error) return console.log(error.message);
    }
}

export default connectDB;