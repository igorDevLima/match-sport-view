import AuthRepository from "./AuthRepository.js";
import UserRepository from "../user/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, ConflictError } from "../common/helpers/api-errors.js";

class AuthController {
  async index(req, res) {
    const bodyUserNameAndEmail = {
      email: req.body.email,
      password: req.body.password,
    };

    const userExists = await AuthRepository.findByEmail(
      bodyUserNameAndEmail.email
    );

    if (!userExists) {
      throw new BadRequestError("User don't exist!");
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!comparePassword) {
      throw new BadRequestError("Invalid password!");
    }

    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: userExists._id,
      },
      secret
    );

    await AuthRepository.createToken({
      user_id: userExists._id,
      token: token,
    });

    return res
      .status(200)
      .json({ message: "Token signed successfully!", token });
  }

  async show(req, res) {
    const { token } = await req.body;

    const userToken = await AuthRepository.findAuthorizationToken(token);

    if (!userToken) throw new BadRequestError("Token not found!");

    const userData = await UserRepository.find(userToken.user_id);

    return res
      .status(200)
      .json({ message: "Token signed successfully", userData });
  }

  async store(req, res) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const bodyUserNameAndEmail = {
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
    };

    const userExists = await AuthRepository.findByUserNameOrEmail(
      bodyUserNameAndEmail
    );

    if (userExists) throw new ConflictError("User already exists");

    const newUser = await AuthRepository.createUser(bodyUserNameAndEmail);

    return res.status(201).json({
      message: "User created successfully!",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  }
}

export default new AuthController();
