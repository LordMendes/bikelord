import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { routes } from "@routes/routes";
import timeout from "connect-timeout";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);
app.use(timeout(100));

const haltOnTimedout = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.timedout) next();
};
app.use(haltOnTimedout);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🏃`);
});
