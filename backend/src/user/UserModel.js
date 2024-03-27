import mongoose from "mongoose";

export const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  favorite_teams: [
    {
      team_id: String,
      name: String
    },
  ],
});
