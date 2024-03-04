import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).json({ message: "please enter valid files" });
        }

        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json({ message: "user Already Exist" });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        })
        const saved = await user.save();

        res.status(201).json(saved)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}