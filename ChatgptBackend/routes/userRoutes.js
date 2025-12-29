import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/userController.js";
import { protect } from '../middlewares/auth.js'
import { getPublishedImages } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/data", protect, getUser)
userRouter.get("/published", protect, getPublishedImages)

export default userRouter;