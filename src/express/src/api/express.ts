import "reflect-metadata";
import "express-async-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import { sequelizeSetupDB } from "../@seedwork/db/sequelize/sequelize-setup-db";
import router from "./routes/router";
import {
  CustomError,
  InvalidUuidError,
  LoadEntityError,
  NotFoundError,
  ValidationError,
  EntityValidationError,
  SearchValidationError,
} from "@m27/the-food/src/@seedwork/domain";
import {
  BadRequestError,
  InvalidCredentialsError,
  InvalidPasswordError,
} from "@m27/the-food/src/@seedwork/application";

const app: Express = express();

app.use(express.json());
app.use('/api',router);

app.get("/", (request, response) => {
  return response.json({ message: "Hello world!" });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (
      err instanceof CustomError ||
      err instanceof BadRequestError ||
      err instanceof InvalidCredentialsError ||
      err instanceof InvalidPasswordError ||
      err instanceof InvalidUuidError ||
      err instanceof LoadEntityError ||
      err instanceof NotFoundError ||
      err instanceof ValidationError ||
      err instanceof EntityValidationError ||
      err instanceof SearchValidationError
    ) {
      return response.json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

sequelizeSetupDB();

export default app;
