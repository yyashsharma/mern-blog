import jwt from 'jsonwebtoken'

export const generateToken = ({ validUser }) => {
    const token = jwt.sign({ "id": validUser._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15d" })
    return token;
}