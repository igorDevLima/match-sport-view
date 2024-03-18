import axios from "axios";

class LeagueRepository {
  async findAll() {
    const apiKey = process.env.SPORT_API_SECRET;

    const leagues = await axios.get("https://v3.football.api-sports.io/leagues", {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey,
      },
    });

    return leagues.data;
  }
}

export default new LeagueRepository();
