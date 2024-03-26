import express from "express";
import FootballTeamController from "../controllers/FootballTeamController.js";
import authMiddleware from "../middlewares/auth.js";
import { validateQueryRequest } from "../middlewares/validateRequest.js";
import { teamQueryValidateSchema } from "../validateSchemas.js";
import { limitRequestWithBearerToken } from "../middlewares/rateLimit.js";

const router = express.Router();

router.get(
  "/football/team",
  [
    authMiddleware,
    validateQueryRequest(teamQueryValidateSchema),
    limitRequestWithBearerToken("team", 6),
  ],
  (req, res) => FootballTeamController.index(req, res)
);

export default router;
