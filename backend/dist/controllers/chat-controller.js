"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const openai_config_js_1 = require("../config/openai-config.js");
const openai_1 = require("openai");
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        //grab chat of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: "messgae", role: "user" });
        user.chats.push({ content: "messgae", role: "user" });
        //send all chats with new one to OpenAI API
        const config = (0, openai_config_js_1.configureOpenAI)();
        const openai = new openai_1.OpenAIApi(config);
        //get latest response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save;
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.generateChatCompletion = generateChatCompletion;
