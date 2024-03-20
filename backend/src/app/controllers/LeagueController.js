import { NotFoundError } from "../helpers/api-errors.js";
import LeagueRepository from "../repositories/LeagueRepository.js";

class LeagueController {
  async index(req, res) {
    const allLeagues = await LeagueRepository.findAll();

    if (allLeagues.results === 0) throw new NotFoundError("Leagues not found!");

    return res.status(200).json({
      message: "All leagues found!",
      results: allLeagues.results,
      allLeagues: allLeagues.response,
    });
  }

  async show(req, res) {
    const league = await LeagueRepository.find(req.params.id);

    if (!league) throw new NotFoundError("League not found!");

    return res.status(200).json({
      message: "League found!",
      league: {
        ...league.league,
        country: league.country,
        seasons: league.seasons,
      },
    });
  }
}

export default new LeagueController();
