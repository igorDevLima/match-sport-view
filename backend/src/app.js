import express from "express";
import authRouter from "./app/routes/AuthRoute.js";

const app = express();

app.use(express.json());

app.use(authRouter);

export default app
