import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import { generateToken } from "../utils/generateAuthToken.js";



export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return next(errorHandler(400, 'Invalid details'))
        }

        const userFound = await User.findOne({ email });
        if (userFound) {
            return next(errorHandler(400, "User Already Exist"))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        })
        const saved = await user.save();

        res.status(201).json({ success: true, message: "User Registered Successfully" })

    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || email === '' || password === '') {
            return next(errorHandler(400, 'Invalid details'))
        }
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User Not Found"))
        }

        const comparedPassword = bcryptjs.compareSync(password, validUser.password);

        if (!comparedPassword) {
            return next(errorHandler(404, "Invalid Credentials"))
        }

        const token = generateToken({ validUser });

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json({ success: true, message: "User Logged in Successfully",rest })

    } catch (error) {
        next(error)
    }
}