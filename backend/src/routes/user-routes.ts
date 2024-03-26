import {Router} from "express";
import {getAllUsers, userSignUp} from '../controllers/user-controller.js';


const userRouter = Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup",userSignUp);


export default userRouter;
