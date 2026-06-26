import { register } from "../controllers/auth.controllers.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", register);

export default authRouter;