import mongoose from "mongoose";
import User from "../model/users.models.js"

const generateAccessandRefreshTokens = function (user) {
    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
      });
}


const registerUser = async (req, res) => {
    const { username, fullname, email, password } = req.body;
    try {
        const user = await User.create({username,fullname,email,password})
        const user2 = new User({username,fullname,email,password})
        await user2.save();
        res.status(201).json({
            message: "New user created",
            user,
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "Username or email already exists." });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

export {registerUser}