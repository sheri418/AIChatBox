"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConnectDatabase = async () => {
    const mongoDbUrl = process.env.MONGODB_URL;
    if (!mongoDbUrl) {
        throw new Error("Url not provide");
    }
    try {
        await (0, mongoose_1.connect)(mongoDbUrl);
        console.log("Database connected");
    }
    catch (error) {
        console.error("Connecting Error:", error);
        throw new Error("Database Not Connected");
    }
};
exports.default = ConnectDatabase;
