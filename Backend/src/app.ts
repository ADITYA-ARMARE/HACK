import express from 'express';
import type{Request,Response} from 'express'
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.ts';
import uploadRoute from './routes/uploadRoute.ts'
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

 
const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);

const app = express();

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/upload",uploadRoute)
app.use((req:Request, res:Response) => res.status(404).json({ success: false, message: 'Route not found' }));


export default app;


