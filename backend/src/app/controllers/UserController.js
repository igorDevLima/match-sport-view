import { BadRequestError, NotFoundError } from "../helpers/api-errors.js";
import UserRepository from "../repositories/UserRepository.js";
import { isValidObjectId } from "mongoose";

class UserController {
  async index(req, res) {
    const allUsers = await UserRepository.findAll();

    if (!allUsers) throw new NotFoundError("Users not found!");

    return res.status(200).json({ message: "All users found", allUsers });
  }

  async show(req, res) {
    if (!isValidObjectId(req.params.id))
      throw new BadRequestError("Invalid objectId!");

    const user = await UserRepository.find(req.params.id);

    if (!user) throw new NotFoundError("User not found!");

    return res.status(200).json({ message: "User found", user });
  }
}

export default new UserController();
