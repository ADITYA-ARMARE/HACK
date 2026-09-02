import type{ Request,Response} from "express";
import bcrypt from 'bcrypt'
import crypto from 'crypto';
import usermodel from "../models/userModel.ts";
import jwt, { type SignOptions } from "jsonwebtoken";


//creating user
export const createuser = async (req:Request,res:Response)=>{
    try {
        const{fullname,email,password,workerid,healthcenter,region}=req.body;
        const phone = Number(req.body.phone);
        const users = await usermodel.findOne({email:email})
        if(users) return res.status(400).json({ success: false, message: "Email already registered" });
        if(!users){
            const hash = await bcrypt.hash(password,12);
            const createuser = await usermodel.create({
                fullname,
                email,
                password:hash,
                phone,
                workerid,
                healthcenter,
                region,
            });
            if(createuser){
                const options:SignOptions = {expiresIn:Number(process.env.EXPIRES)||'7d'};
                const token = jwt.sign({email:email,userid:createuser._id},String(process.env.SECRET),options);
                res.cookie("token",token);
                res.status(200).json({success : true,message:"registered and LOGINED SUCCESSFULLY!!!"});
            }
            // return res.status(201).send("user created successfully!!!");
        }
        else{
             return res.status(409).json({message:"Bad Request!!!"});
        }
    } catch (error) {
        res.status(400).json({message:"Bad Request!!!"});
        console.log(error);
    }
}
//login
export const logined = async (req:Request,res:Response)=>{
    try {
        const{email,password} =req.body;
        const userdata = await usermodel.findOne({email:email});
        if(userdata){
       const result = await bcrypt.compare(password,userdata.password);
             if(result){
                const options:SignOptions = {expiresIn:Number(process.env.EXPIRES)||'7d'};
                const token = jwt.sign({email:email,userid:userdata._id},String(process.env.SECRET),options);
                res.cookie("token",token);
                res.status(200).json({success:true,message :"LOGINED SUCCESSFULLY!!!"});
             }
             else{
                res.status(401).json({message:"invalid credentials"});
             }
        }
        else{
            res.status(404).json({message:"Not Found!!!!"});
        }
    } catch (error) {
        console.error(error);
    }
}
//logout
export const logout = (req:Request,res:Response)=>{
    res.cookie("token"," ");
    res.status(200).json({message:"YOU SUCCESSFULLY LOGOUT!!!"});
}

//Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  const user = await usermodel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ success: false, message: "No user found with that email" });
  }

  const rawToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Instead of email, log the reset link
  const resetUrl = `${process.env.CLIENT_URL}/api/auth/reset-password/${rawToken}`;
  console.log("Reset link:", resetUrl);

  res.json({ success: true, message: "Reset link generated. Check console log." });
};

// Reset Password 
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || Array.isArray(token)) {
    return res.status(400).json({ success: false, message: "Invalid reset token" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await usermodel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password +resetPasswordToken +resetPasswordExpire");

  if (!user) {
    return res.status(400).json({ success: false, message: "Reset link invalid or expired" });
  }

  user.password = password; // pre-save hook will hash
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

//   res.json({ success: true, message: "Password updated successfully" });
res.render("PassResult");
};


export const htMl = async (req:Request,res:Response)=>{
    const {token} =req.params;
    const resetUrl = `/api/auth/reset-password/${token}`;
    await res.render('Passwordrest',{resetUrl});
}