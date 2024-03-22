import express from "express";
import FootballTeamController from "../controllers/FootballTeamController.js";
import authMiddleware from "../middlewares/auth.js";
import { validateQueryRequest } from "../middlewares/validateRequest.js";
import { teamQueryValidateSchema } from "../validateSchemas.js";

const router = express.Router();

router.get(
  "/football/team",
  [authMiddleware, validateQueryRequest(teamQueryValidateSchema)],
  (req, res) => FootballTeamController.index(req, res)
);

export default router;
