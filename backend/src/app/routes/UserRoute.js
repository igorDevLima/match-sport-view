import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/auth.js";
import { validateParamsRequest } from "../middlewares/validateRequest.js";
import { idParamValidateSchema } from "../validateSchemas.js";
import { validateMongoObjectId } from "../middlewares/validateMongoObjectId.js";
import { limitRequestWithBearerToken } from "../middlewares/rateLimit.js";

const router = express.Router();

router.get(
  "/user",
  [authMiddleware, limitRequestWithBearerToken("users", 3)],
  (req, res) => UserController.index(req, res)
);

router.get(
  "/user/:id",
  [
    authMiddleware,
    validateMongoObjectId,
    limitRequestWithBearerToken("user", 6),
  ],
  (req, res) => UserController.show(req, res)
);

router.post(
  "/user/:id/favorite-team",
  [
    authMiddleware,
    validateMongoObjectId,
    limitRequestWithBearerToken("favorite-team", 6),
  ],
  (req, res) => UserController.addFavoriteTeams(req, res)
);

export default router;
