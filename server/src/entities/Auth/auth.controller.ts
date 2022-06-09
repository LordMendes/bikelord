import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

class AuthController {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userAuth = await prisma.user.findUnique({
      where: { email },
    });
    if (!userAuth) {
      return res.status(400).json({ message: "Login Error" });
    }
    const isValidPassword = await bcrypt.compare(password, userAuth.password);
    if (email === userAuth?.email && isValidPassword) {
      const token = jwt.sign(
        { id: userAuth.id },
        process.env.SECRET as string,
        {
          expiresIn: "12h",
        }
      );
      return res.json({ auth: true, token: token });
    }
    res.status(400).json({ message: "Login Error" });
  }

  public checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"] as string;
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });

      next();
    });
  };
}
const authController = new AuthController();
export { authController };
