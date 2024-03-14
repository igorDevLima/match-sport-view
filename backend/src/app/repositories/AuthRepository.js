import { User } from "../../../models/User.js"

class AuthRepository {
    
    create(user) {
        try {
            const newUser = {
                username: user.username,
                email: user.email,
                password: user.password
            }

            const response = new User(newUser).save();

            return response;
        } catch (err) {
            console.log(err);
        }
    }

    findByUserNameOrEmail(data) {
        return User.findOne({ $or: [{ username: data.username }, { email: data.email }] });
    }

    // find() { }
    // findAll() { }
    // update() { }
    // delete() { }

}

export default new AuthRepository();