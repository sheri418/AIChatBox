import { Router } from "express";
import { getAllUsers, userlogin, userSignUp } from '../controllers/user-controller.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignUp);
userRouter.post("/login", validate(loginValidator), userlogin);
export default userRouter;
