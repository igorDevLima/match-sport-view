import axios from "axios";
import { FootballApiSports } from "../../common/helpers/api-sports.js";

class FootballLeagueRepository extends FootballApiSports {
  async find(leagueId) {
    const league = await axios.get(this.baseUrl + "/leagues", {
      params: { id: leagueId },
      headers: {
        "x-rapidapi-host": this.baseUrl,
        "x-rapidapi-key": this.apiKey,
      },
    });

    return league.data.response[0];
  }

  async findAll() {
    const leagues = await axios.get(this.baseUrl + "/leagues", {
      headers: {
        "x-rapidapi-host": this.xRapidHost,
        "x-rapidapi-key": this.apiKey,
      },
    });

    return leagues.data;
  }
}

export default new FootballLeagueRepository();
