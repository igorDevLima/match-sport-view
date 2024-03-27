import { BadRequestError, NotFoundError } from "../../common/helpers/api-errors.js";
import FootballTeamRepository from "./TeamRepository.js";

class FootballTeamController {
  async index(req, res) {
    const { id, leagueId, season, search } = req.query;

    if (!id && !leagueId && !search)
      throw new BadRequestError("At least one parameter is required");

    if (leagueId && !season)
      throw new BadRequestError("The Season field is required");

    if (!leagueId && season)
      throw new BadRequestError("The League field is required");

    let parameters = {};

    if (id) parameters.id = id;

    if (leagueId) parameters.league = league;

    if (season) parameters.season = season;

    if (search) parameters.search = search;

    const allTeams = await FootballTeamRepository.find(parameters);

    if (allTeams.results === 0) throw new NotFoundError("Teams not found");

    return res.status(200).json({
      message: "All teams found!",
      results: allTeams.results,
      allTeams: allTeams.response,
    });
  }
}

export default new FootballTeamController();
