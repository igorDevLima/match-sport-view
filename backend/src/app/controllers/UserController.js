import UserRepository from "../repositories/UserRepository.js";

class UserController {

    async index(req, res) {
        try {
            const allUsers = await UserRepository.findAll();

            return res.status(200).json({ message: "All users found", allUsers })
        } catch (err) {
            console.error(err);
            return res.status(404).json({ error: err });
        }

    }

    async show(req, res) {
        try {
            const user = await UserRepository.find(req.params.id)

            if (!user) return res.status(404).json({ message: "User not found!" });

            return res.status(200).json({ message: "User found", user })
        } catch (err) {
            console.log(err);
            return res.status(404).json({ error: err });
        }
    }
}

export default new UserController();