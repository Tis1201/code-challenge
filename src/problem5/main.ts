import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controllers/user.controller";
import { GlobalErrorHandler } from "./middlewares/error-handler";
import * as dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma";

dotenv.config();

const prisma = new PrismaClient();
Container.set(PrismaClient, prisma);

useContainer(Container);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = createExpressServer({
  controllers: [UserController],
  middlewares: [],
  defaultErrorHandler: false,

  validation: true,
});

app.use(GlobalErrorHandler.notFound);
app.use(GlobalErrorHandler.handle);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
