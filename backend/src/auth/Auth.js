import express from "express";
import AuthController from "./AuthController.js";
import { validateBodyRequest } from "../common/middlewares/validateRequest.js";
import {
  loginValidateSchema,
  registerValidateSchema,
  tokenValidateSchema,
} from "../validateSchemas.js";
import { limitRequestWithIp } from "../common/middlewares/rateLimit.js";

const router = express.Router();

router.get(
  "/auth/login",
  [validateBodyRequest(loginValidateSchema), limitRequestWithIp("login", 6)],
  (req, res) => AuthController.index(req, res)
);

router.post(
  "/auth/register",
  validateBodyRequest(registerValidateSchema),
  (req, res) => AuthController.store(req, res)
);

router.get("/auth/me", validateBodyRequest(tokenValidateSchema), (req, res) =>
  AuthController.show(req, res)
);

export default router;
