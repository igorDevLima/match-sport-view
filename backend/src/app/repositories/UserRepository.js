import { User } from "../models/User.js";

class UserRepository {
  findAll() {
    return User.find({}, "-password");
  }

  find(userId) {
    return User.findOne({ _id: userId }, "-password");
  }
}

export default new UserRepository();
