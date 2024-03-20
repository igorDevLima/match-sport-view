import axios from "axios";

class FootballLeagueRepository {
  async find(leagueId) {
    const apiKey = process.env.SPORT_API_SECRET;

    const league = await axios.get(
      "https://v3.football.api-sports.io/leagues" ,
      {
        params:{id:leagueId},
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    return league.data.response[0];
  }

  async findAll() {
    const apiKey = process.env.SPORT_API_SECRET;

    const leagues = await axios.get(
      "https://v3.football.api-sports.io/leagues",
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    return leagues.data;
  }
}

export default new FootballLeagueRepository();
