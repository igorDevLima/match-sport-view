import mongoose from "mongoose";

export const Token = mongoose.model("Token", {
  user_id: String,
  token: String,
});
