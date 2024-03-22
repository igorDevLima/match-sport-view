import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/auth.js";
import { validateParamsRequest } from "../middlewares/validateRequest.js";
import { idParamValidateSchema } from "../validateSchemas.js";
import { validateMongoObjectId } from "../middlewares/validateMongoObjectId.js";

const router = express.Router();

router.get("/user", authMiddleware, (req, res) =>
  UserController.index(req, res)
);

router.get(
  "/user/:id",
  [
    authMiddleware,
    validateParamsRequest(idParamValidateSchema),
    validateMongoObjectId,
  ],
  (req, res) => UserController.show(req, res)
);

router.post(
  "/user/:id/favorite-team",
  [
    authMiddleware,
    validateParamsRequest(idParamValidateSchema),
    validateMongoObjectId,
  ],
  (req, res) => UserController.addFavoriteTeams(req, res)
);

export default router;
