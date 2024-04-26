"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/chatRoutes.js
const express_1 = require("express");
const token_manager_js_1 = require("../utils/token-manager.js");
const validators_js_1 = require("../utils/validators.js");
const chat_controller_js_1 = require("../controllers/chat-controller.js");
const chatRoutes = (0, express_1.Router)();
chatRoutes.post("/new", token_manager_js_1.verifyToken, (0, validators_js_1.validate)(validators_js_1.chatCompletionValidator), chat_controller_js_1.generateChatCompletion);
exports.default = chatRoutes;
