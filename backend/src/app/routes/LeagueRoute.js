import express from "express";
import authMiddleware from "../middlewares/auth.js";
import FootballLeagueController from "../controllers/FootballLeagueController.js";

const router = express.Router();

router.get("/football/league", authMiddleware, (req, res) =>
  FootballLeagueController.index(req, res)
);

router.get("/football/league/:id", authMiddleware, (req, res) =>
  FootballLeagueController.show(req, res)
);

export default router;
