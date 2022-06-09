import { Router } from "express";
import { authRouter } from "@entities/Auth/auth.routes";
import { userRouter } from "@entities/Users/user.routes";

const routes = Router();

routes.get("/healthCheck", (req, res) => {
  res.json({ message: "OK" });
});

routes.use("/auth", authRouter);
routes.use("/user", userRouter);

export { routes };
