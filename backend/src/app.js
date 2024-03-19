import express from "express";
import authRouter from "./app/routes/AuthRoute.js";
import userRouter from "./app/routes/UserRoute.js";
import leagueRouter from "./app/routes/LeagueRoute.js";

const app = express();

app.use(express.json());

app.use(authRouter, userRouter, leagueRouter);

export default app;
