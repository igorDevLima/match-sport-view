import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import "express-async-errors";

//routes
import authRouter from "./auth/Auth.js";
import userRouter from "./user/User.js";
import leagueRouter from "./football/league/League.js";
import teamRouter from "./football/team/Team.js";

//middlewares
import errorMiddleware from "./common/middlewares/error.js";
import { headerConfig } from "./common/middlewares/header.js";
import { limitRequestWithIp } from "./common/middlewares/rateLimit.js";

const app = express();

app.use(express.json());

app.disable("x-powered-by");

const middlewares = [headerConfig, limitRequestWithIp("all", 7)];

app.use(middlewares);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/football/league", leagueRouter);

app.use("/football/team", teamRouter);

app.use(errorMiddleware);

export default app;
