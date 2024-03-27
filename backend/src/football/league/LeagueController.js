import { NotFoundError } from "../../common/helpers/api-errors.js";
import FootballLeagueRepository from "../league/LeagueRepository.js";

class FootballLeagueController {
  async index(req, res) {
    const allLeagues = await FootballLeagueRepository.findAll();

    if (allLeagues.results === 0) throw new NotFoundError("Leagues not found!");

    return res.status(200).json({
      message: "All leagues found!",
      results: allLeagues.results,
      allLeagues: allLeagues.response,
    });
  }

  async show(req, res) {
    const league = await FootballLeagueRepository.find(req.params.id);

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

export default new FootballLeagueController();
