import { Token } from "../models/Token.js";
import { User } from "../models/User.js";

class AuthRepository {
  createUser(user) {
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    const response = new User(newUser).save();

    return response;
  }

  createToken(data) {
    const addUserToken = new Token({
      user_id: data.user_id,
      token: data.token,
    }).save();

    return addUserToken;
  }

  findByEmail(email) {
    return User.findOne({ email: email }).setOptions({ sanitizeFilter: true });
  }

  findAuthorizationToken(token) {
    return Token.findOne({ token: token }).setOptions({ sanitizeFilter: true });
  }
}

export default new AuthRepository();
