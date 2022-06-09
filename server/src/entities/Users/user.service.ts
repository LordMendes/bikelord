import { PrismaClient } from "@prisma/client";
import { User } from "@entities/Users/user.interface";
import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";

class UserService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create({ name, email, password }: User) {
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return { message: "User already exists" };
    }
    if (password && !this.validatePassword(password)) {
      return { message: "Password is not valid" };
    }
    const hashedPassword = await bcrypt.hash(password!, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { ...newUser, password: undefined };
  }

  validatePassword(password: string) {
    const schema = new PasswordValidator();
    schema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(1)
      .has()
      .not()
      .spaces();

    return schema.validate(password);
  }
}

const userService = new UserService();
export { userService };
