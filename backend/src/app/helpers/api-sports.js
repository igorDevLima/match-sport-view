class ApiSports {
  constructor() {
    this.apiKey = process.env.SPORT_API_SECRET;
  }
}

export class FootballApiSports extends ApiSports {
  constructor() {
    super();
    this.xRapidHost = "v3.football.api-sports.io";
    this.baseUrl = "https://v3.football.api-sports.io";
  }
}
