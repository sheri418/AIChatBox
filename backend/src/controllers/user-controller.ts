import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import {hash,compare} from "bcrypt";
import { createToken } from '../utils/token-manager';
import { COOKIE_NAME } from '../utils/constant';



export const getAllUsers =async (req:Request,res:Response,next:NextFunction) =>{
    //get all users
    try {
        const users=await User.find();
        return res.status(200).json({message:"OK",users});
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(200).json({message:"Error",cause:error.message});
        
    }
}


export const userlogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password } = req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).send("User is not Register");
        }
        const isPasswordCorrect= await compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password")
        }

//create token and store cookies

        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/",
                    
        });
        const token=createToken (user._id.toString(),user.email,"7d");
        const expires = new Date();

        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME, token,
        {
            path:"/",
        domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
    });


       return res.status(200).json({ message: "User login up successfully", id: user._id.toString() });
    } catch (error) {
        console.error("Error login up user:", error);
        return res.status(400).json({ message: "Failed to login up user", error: error.message });
    }
}



export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(401).send("User already register")
        }
         // Validate email format
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"invalid email format"});

        }
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        return res.status(201).json({ message: "User signed up successfully", id: user._id.toString() });
    } catch (error) {
        return res.status(400).json({ message: "Failed to sign up user", error: error.message });
    }
}