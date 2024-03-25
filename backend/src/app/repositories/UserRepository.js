import { User } from "../models/User.js";

class UserRepository {
  findAll() {
    return User.find({}, "-password");
  }

  find(userId) {
    return User.findOne({ _id: userId }, "-password").setOptions({
      sanitizeFilter: true,
    });
  }

  updateFavoriteTeam(userId, teamData) {
    return User.updateOne(
      { _id: userId, "favorite_teams.team_id": { $exists: false } },
      {
        $push: {
          favorite_teams: { team_id: teamData.id, name: teamData.name },
        },
      }
    );
  }
}

export default new UserRepository();
