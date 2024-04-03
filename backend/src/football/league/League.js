import express from "express";
import authMiddleware from "../../common/middlewares/auth.js";
import FootballLeagueController from "./LeagueController.js";
import { validateParamsRequest } from "../../common/middlewares/validateRequest.js";
import { idParamValidateSchema } from "../../validateSchemas.js";
import { limitRequestWithBearerToken } from "../../common/middlewares/rateLimit.js";

const router = express.Router();

router.get(
  "/",
  [authMiddleware, limitRequestWithBearerToken("league", 3)],
  (req, res) => FootballLeagueController.index(req, res)
);

router.get(
  "/:id",
  [
    authMiddleware,
    validateParamsRequest(idParamValidateSchema),
    limitRequestWithBearerToken("leagueId", 6),
  ],
  (req, res) => FootballLeagueController.show(req, res)
);

export default router;
