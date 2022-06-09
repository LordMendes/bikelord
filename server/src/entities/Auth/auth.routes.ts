import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.post("/logout", (req, res) => {
  res.json({ auth: false, token: null });
});


// authRouter.get('/clientes', authController.checkAuth, (req, res, next) => { 
//     console.log("Retornou todos clientes!");
//     res.json([{id:1,nome:'luiz'}]);
// })

export { authRouter };
