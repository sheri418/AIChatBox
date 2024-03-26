import User from "../models/User.js";
import { hash } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    //get all users
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        return res.status(201).json({ message: "User signed up successfully", id: user._id.toString() });
    }
    catch (error) {
        console.error("Error signing up user:", error);
        return res.status(400).json({ message: "Failed to sign up user", error: error.message });
    }
};
