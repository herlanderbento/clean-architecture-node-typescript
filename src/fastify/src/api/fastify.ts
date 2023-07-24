import cookie from "@fastify/cookie";
import fastify from "fastify";
import { authenticateRoutes, userRoutes } from "./routes";
import { sequelizeSetupDB } from "../@seedwork/db/sequelize/sequelize-setup-db";

const app = fastify();

app.register(cookie);

app.register(userRoutes, { prefix: "user" });
app.register(authenticateRoutes, { prefix: "authenticate" });

sequelizeSetupDB();

export { app };
