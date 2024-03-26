import "express-async-errors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import "express-async-errors";

//routes
import authRouter from "./app/routes/AuthRoute.js";
import userRouter from "./app/routes/UserRoute.js";
import leagueRouter from "./app/routes/LeagueRoute.js";
import teamRouter from "./app/routes/TeamRoute.js";

//middlewares
import errorMiddleware from "./app/middlewares/error.js";
import { headerConfig } from "./app/middlewares/header.js";
import { limitRequestWithIp } from "./app/middlewares/rateLimit.js";

const app = express();

app.use(express.json());

app.disable("x-powered-by");

app.use(headerConfig);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(limitRequestWithIp("all", 7));

app.use(authRouter, userRouter, leagueRouter, teamRouter);

app.use(errorMiddleware);

export default app;
