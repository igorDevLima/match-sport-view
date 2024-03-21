import axios from "axios";
import { FootballApiSports } from "../helpers/api-sports.js";

class FootballTeamRepository extends FootballApiSports {
  async find(parameters) {
    const teams = await axios.get(this.baseUrl + "/teams", {
      params: parameters,
      headers: {
        "x-rapidapi-host": this.xRapidHost,
        "x-rapidapi-key": this.apiKey,
      },
    });

    return teams.data;
  }
}

export default new FootballTeamRepository();
