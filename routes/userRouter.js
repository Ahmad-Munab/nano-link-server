import { Router } from "express";
const userRouter = Router();
import userControllers from "../controllers/User.js";
import protect from "../middlewares/authUser.js"

userRouter.get("/", protect ,userControllers.getUserData)
userRouter.post("/register", userControllers.registerUser);
userRouter.post("/login", userControllers.loginUser);

export default userRouter;
