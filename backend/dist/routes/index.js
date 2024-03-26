import { Router } from "express";
import userRouter from './user-routes.js';
import chatRoutes from './chat-routes.js';
const appRouter = Router();
appRouter.use("/user", userRouter); //domain/api/v1
appRouter.use("/chats", chatRoutes);
export default appRouter;
