import express from "express";
import UserController from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", verifyToken, (req, res) => UserController.index(req, res));

router.get("/user/:id", verifyToken, (req, res) =>
  UserController.show(req, res)
);

export default router;
