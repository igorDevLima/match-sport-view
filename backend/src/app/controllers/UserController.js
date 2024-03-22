import { BadRequestError, NotFoundError } from "../helpers/api-errors.js";
import UserRepository from "../repositories/UserRepository.js";
import FootballTeamRepository from "../repositories/FootballTeamRepository.js";

class UserController {
  async index(req, res) {
    const allUsers = await UserRepository.findAll();

    if (!allUsers) throw new NotFoundError("Users not found!");

    return res.status(200).json({ message: "All users found", allUsers });
  }

  async show(req, res) {
    const user = await UserRepository.find(req.params.id);

    if (!user) throw new NotFoundError("User not found!");

    return res.status(200).json({ message: "User found", user });
  }

  async addFavoriteTeams(req, res) {
    const { id: userId } = req.params;
    const { team_id } = req.body;

    const userExist = await UserRepository.find(userId);

    if (!userExist) throw new BadRequestError("User don't exist");

    if (!team_id)
      throw new BadRequestError("Sent a team_id in the request body");

    const team = await FootballTeamRepository.find({
      id: team_id,
    });

    const favoriteTeams = await UserRepository.updateFavoriteTeam(
      userId,
      team.response[0].team
    );

    if (favoriteTeams.modifiedCount === 0)
      return res
        .status(400)
        .json({ message: "Favorite team not added", favoriteTeams });

    return res
      .status(201)
      .json({ message: "Favorite team added", favoriteTeams });
  }
}

export default new UserController();
