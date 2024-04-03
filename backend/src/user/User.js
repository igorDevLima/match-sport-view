import express from "express";
import UserController from "./UserController.js";
import authMiddleware from "../common/middlewares/auth.js";
import { validateMongoObjectId } from "../common/middlewares/validateMongoObjectId.js";
import { limitRequestWithBearerToken } from "../common/middlewares/rateLimit.js";

const router = express.Router();

router.get(
  "/",
  [authMiddleware, limitRequestWithBearerToken("users", 3)],
  (req, res) => UserController.index(req, res)
);

router.get(
  "/:id",
  [
    authMiddleware,
    validateMongoObjectId,
    limitRequestWithBearerToken("user", 6),
  ],
  (req, res) => UserController.show(req, res)
);

router.post(
  "/:id/favorite-team",
  [
    authMiddleware,
    validateMongoObjectId,
    limitRequestWithBearerToken("favorite-team", 6),
  ],
  (req, res) => UserController.addFavoriteTeams(req, res)
);

export default router;
