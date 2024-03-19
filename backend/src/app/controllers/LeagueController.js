import { NotFoundError } from "../helpers/api-errors.js";
import LeagueRepository from "../repositories/LeagueRepository.js";

class LeagueController {
  async index(req, res) {
    const allLeagues = await LeagueRepository.findAll();

    if (!allLeagues) throw new NotFoundError("Could not find any league!");

    return res.status(200).json({ message: "Leagues found!", allLeagues });
  }

  async show(req, res) {
    const league = await LeagueRepository.find(req.params.id);

    if (league.results === 0) throw new NotFoundError("League not found!");

    return res.status(200).json({ message: "League found!", league });
  }
}

export default new LeagueController();
