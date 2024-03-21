import express from "express";
import FootballTeamController from "../controllers/FootballTeamController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/football/team", authMiddleware, (req, res) =>
  FootballTeamController.index(req, res)
);

export default router;
