import { Request, Response } from "express";
import { userService } from "@entities/Users/user.service";
import { User } from "./user.interface";

class UserController {
  public create = async (request: Request, response: Response) => {
    try {
    const user = await userService.create(request.body);
      response.status(200).json(user);
    } catch (error) {
      response.status(400).json({ error });
    }
  };
}

const userController = new UserController();

export { userController };