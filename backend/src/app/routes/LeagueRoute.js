import express from "express";
import authMiddleware from "../middlewares/middlewares/authMiddleware.js";
import LeagueController from "../controllers/LeagueController.js";

const router = express.Router();

router.get("/league", authMiddleware, (req, res) =>
  LeagueController.index(req, res)
);

router.get("/league/:id", authMiddleware, (req, res) =>
  LeagueController.show(req, res)
);

export default router;
