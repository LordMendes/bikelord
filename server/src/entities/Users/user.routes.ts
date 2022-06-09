import { Router } from "express";

import { userController } from "@entities/Users/user.controller";

const userRouter = Router();

userRouter.post("/create", userController.create);

export { userRouter };