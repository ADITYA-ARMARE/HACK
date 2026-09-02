import app from "./app.ts";
import dotenv from 'dotenv';
import connectDB from "./db/db.ts";
import { cloudy } from './services/storage.service.ts';
dotenv.config();

const PORT = process.env.PORT;
connectDB();
cloudy();

app.listen(PORT,()=>{
    console.log("SERVER IS RUNNING!!!!");
})