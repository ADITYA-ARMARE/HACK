import jwt from 'jsonwebtoken'
import type{ Request,Response } from 'express'

export const isloggined =async (req:Request,res:Response)=>{
    const token = await req.cookies.token;
    if(token === ' '){
        return res.status(401).send("PLEASE LOGIN !!!");
    }
    else{
        try {
        const decode = jwt.verify(token,process.env.SECRET as string);
        console.log(decode);
        res.status(200).send("valid");
        } catch (error) {
            console.log(error);
        }
    }
}