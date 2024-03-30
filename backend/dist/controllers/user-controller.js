"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = exports.userlogin = exports.getAllUsers = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = require("bcrypt");
const token_manager_1 = require("../utils/token-manager");
const constant_1 = require("../utils/constant");
const getAllUsers = async (req, res, next) => {
    //get all users
    try {
        const users = await User_js_1.default.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const userlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_js_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send("User is not Register");
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        //create token and store cookies
        res.clearCookie(constant_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constant_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "User login up successfully", id: user._id.toString() });
    }
    catch (error) {
        console.error("Error login up user:", error);
        return res.status(400).json({ message: "Failed to login up user", error: error.message });
    }
};
exports.userlogin = userlogin;
const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_js_1.default.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already register");
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "invalid email format" });
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_js_1.default({ name, email, password: hashPassword });
        await user.save();
        return res.status(201).json({ message: "User signed up successfully", id: user._id.toString() });
    }
    catch (error) {
        return res.status(400).json({ message: "Failed to sign up user", error: error.message });
    }
};
exports.userSignUp = userSignUp;
