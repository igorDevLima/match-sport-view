import "express-async-errors";
import express from "express";
import authRouter from "./app/routes/AuthRoute.js";
import userRouter from "./app/routes/UserRoute.js";
import leagueRouter from "./app/routes/LeagueRoute.js";

//middlewares
import errorMiddleware from "./app/middlewares/error.js";

const app = express();

app.use(express.json());

app.use(authRouter, userRouter, leagueRouter);

app.use(errorMiddleware);

export default app;
