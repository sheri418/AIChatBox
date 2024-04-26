"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const bcrypt_1 = require("bcrypt");
const User_js_1 = __importDefault(require("../models/User.js"));
const token_manager_js_1 = require("../utils/token-manager.js");
const constant_js_1 = require("../utils/constant.js");
const getAllUsers = async (req, res, next) => {
    try {
        //get al user
        const users = await User_js_1.default.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User_js_1.default.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_js_1.default({ name, email, password: hashedPassword });
        await user.save();
        // create token and store cookie
        res.clearCookie(constant_js_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constant_js_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userSignup = userSignup;
const userLogin = async (req, res, next) => {
    try {
        //user Login
        const { email, password } = req.body;
        const user = await User_js_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(constant_js_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constant_js_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userLogin = userLogin;
const verifyUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission did't match");
        }
        // const isPasswordCorrect = await compare(password, user.password);
        // if (!isPasswordCorrect) {
        //   return res.status(403).send("Incorrect Password");
        // }
        // //create token and store cookie
        // res.clearCookie(COOKIE_NAME, {
        //   path: "/",
        //   domain: "localhost",
        //   httpOnly: true,
        //   signed: true,
        // });
        // const token = createToken(user._id.toString(), user.email, "7d");
        // const expires = new Date();
        // expires.setDate(expires.getDate() + 7);
        // res.cookie(COOKIE_NAME, token, {
        //   path: "/",
        //   domain: "localhost",
        //   expires,
        //   httpOnly: true,
        //   signed: true,
        // });
        return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.verifyUser = verifyUser;
