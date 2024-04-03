import express from "express";
import FootballTeamController from "./TeamController.js";
import authMiddleware from "../../common/middlewares/auth.js";
import { validateQueryRequest } from "../../common/middlewares/validateRequest.js";
import { teamQueryValidateSchema } from "../../validateSchemas.js";
import { limitRequestWithBearerToken } from "../../common/middlewares/rateLimit.js";

const router = express.Router();

router.get(
  "/",
  [
    authMiddleware,
    validateQueryRequest(teamQueryValidateSchema),
    limitRequestWithBearerToken("team", 6),
  ],
  (req, res) => FootballTeamController.index(req, res)
);

export default router;
