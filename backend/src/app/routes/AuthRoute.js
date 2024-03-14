import express from "express"
import AuthController from "../controllers/AuthController.js";
import { body } from "express-validator";

const router = express.Router();

const userValidator = [
    body(['username', 'email', 'password'], 'Invalid does not Empty').not().isEmpty(),
    body('username', 'The max username length is 20 characters').isLength({ max: 20 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 20 characters').isLength({ min: 6 }),
]

router.post("/auth/register", userValidator, (req, res) => AuthController.store(req, res));

export default router;