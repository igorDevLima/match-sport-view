import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/user", authMiddleware, (req, res) =>
  UserController.index(req, res)
);

router.get("/user/:id", authMiddleware, (req, res) =>
  UserController.show(req, res)
);

router.post("/user/:id/favorite-team", authMiddleware, (req, res) =>
  UserController.addFavoriteTeams(req, res)
);

export default router;
