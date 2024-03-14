const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

//models
const User = require("../models/User")

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8081;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ukpj5ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log("Connected to database!");
    } catch (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1);
    }
};

const startServer = () => {
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

    const userValidator = [
        body(['username', 'email', 'password'], 'Invalid does not Empty').not().isEmpty(),
        body('username', 'The max username length is 20 characters').isLength({ max: 20 }),
        body('email', 'Invalid email').isEmail(),
        body('password', 'The minimum password length is 20 characters').isLength({ min: 6 }),
    ]

    app.post("/auth/register", userValidator, async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { username, email, password } = req.body;

            const userExists = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (userExists) { return res.status(422).json({ error: "User already exists" }) }

            //create password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            const createUser = await new User({
                username,
                email,
                password: passwordHash
            })

            try {
                await createUser.save();

                return res.status(201).json({ message: "User created successfully!" })

            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: "A server error occurred! try again later", err })
            }

        }

        return res.status(422).json({ errors: errors.array() });
    });
};

const initializeApp = async () => {
    try {
        await connectToDatabase();
        startServer();
    }
    catch (err) {
        console.error("Error initializing the application:", err.message)
        process.exit(1);
    }
}

initializeApp();
