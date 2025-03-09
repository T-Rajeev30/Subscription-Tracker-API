import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

//post : api/v1/auth/sign-up

authRouter.post("/sign-up", signUp);

//post : api/v1/auth/sign-in

authRouter.post("/sign-in", signIn);

//post : api/v1/auth/sign-out

authRouter.post("/sign-out", signOut);

export default authRouter;
