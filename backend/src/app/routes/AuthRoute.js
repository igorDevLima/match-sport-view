import express from "express";
import AuthController from "../controllers/AuthController.js";
import { validateBodyRequest } from "../middlewares/validateRequest.js";
import {
  loginValidateSchema,
  registerValidateSchema,
  tokenValidateSchema,
} from "../validateSchemas.js";

const router = express.Router();

router.get(
  "/auth/login",
  validateBodyRequest(loginValidateSchema),
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
