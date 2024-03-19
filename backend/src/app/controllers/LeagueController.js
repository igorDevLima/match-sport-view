import LeagueRepository from "../repositories/LeagueRepository.js";

class LeagueController {
  async index(req, res) {
    try {
      const allLeagues = await LeagueRepository.findAll();

      if (!allLeagues)
        return res.status(404).json({ message: "Could not find any league!" });

      return res.status(200).json({ message: "Leagues found!", allLeagues });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "A server error occurred! Try again later", err });
    }
  }

  async show(req, res) {
    try {
      const league = await LeagueRepository.find(req.params.id);

      if (!league)
        return res.status(404).json({ message: "League not found!" });

      return res.status(200).json({ message: "League found!", league });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "A server error occurred! Try again later", err });
    }
  }
}

export default new LeagueController();
