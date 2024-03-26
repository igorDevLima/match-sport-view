import express from "express";
import AuthController from "../controllers/AuthController.js";
import { validateBodyRequest } from "../middlewares/validateRequest.js";
import {
  loginValidateSchema,
  registerValidateSchema,
  tokenValidateSchema,
} from "../validateSchemas.js";
import { limitRequestWithIp } from "../middlewares/rateLimit.js";

const router = express.Router();

const tems = [
  {
    id: 0,
    nome: "Flamengo",
    sigla: "Fla",
  },
];

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
