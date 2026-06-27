import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getUser } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/currentUser", isAuth, getUser);

export default userRouter;