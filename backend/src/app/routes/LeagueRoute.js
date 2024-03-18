import express from "express";
import { verifyToken } from "../middlewares/middlewares/authMiddleware.js";
import LeagueController from "../controllers/LeagueController.js";

const router = express.Router();

router.get("/league", verifyToken, (req, res) =>
  LeagueController.index(req, res)
);

export default router;
