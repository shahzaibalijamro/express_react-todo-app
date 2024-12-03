import mongoose from "mongoose";
import User from "../model/users.models.js"

const registerUser = async (req, res) => {
    const { username, fullname, email, password } = req.body;
    try {
        const user = await User.create({username,fullname,email,password})
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