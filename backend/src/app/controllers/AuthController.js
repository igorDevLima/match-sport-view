import { validationResult } from "express-validator";
import AuthRepository from "../repositories/AuthRepository.js";
import bcrypt from "bcrypt"

class AuthController {

            await AuthRepository.createToken({
                user_id: userExists._id,
                token: token
            })
    async store(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(req.body.password, salt);

            const bodyUserNameAndEmail = {
                username: req.body.username,
                email: req.body.email,
                password: passwordHash
            }

            const userExists = await AuthRepository.findByUserNameOrEmail(bodyUserNameAndEmail);

            if (userExists) { return res.status(422).json({ error: "User already exists" }) }

            const newUser = await AuthRepository.create(req.body);

            return res.status(201).json({ message: "User created successfully!", user: newUser });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "A server error occurred! Try again later", err });
        }
    }

    // update() {

    // }
    // delete() {

    // }
}

export default new AuthController;