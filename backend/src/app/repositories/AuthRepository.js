import { Token } from "../models/Token.js";

class AuthRepository {
    
    create(user) {
        try {
            const newUser = {
                username: user.username,
                email: user.email,
                password: user.password
            }

            const response = new User(newUser).save();


    createToken(data) {

        const addUserToken = new Token({
            user_id: data.user_id,
            token: data.token
        }).save();

        return addUserToken;
    }

    findByUserNameOrEmail(data) {
        return User.findOne({ $or: [{ username: data.username }, { email: data.email }] });
    }

    findAuthorizationToken(token) {
        return Token.findOne({ token: token })
    }

}

export default new AuthRepository();