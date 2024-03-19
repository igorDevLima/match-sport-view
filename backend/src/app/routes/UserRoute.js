import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user", authMiddleware, (req, res) => UserController.index(req, res));

router.get("/user/:id", authMiddleware, (req, res) =>
  UserController.show(req, res)
);

export default router;
