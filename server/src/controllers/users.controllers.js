import mongoose from "mongoose";
import User from "../model/users.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// generates tokens
const generateAccessandRefreshTokens = function (user) {
    const accessToken = jwt.sign({_id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({email: user.email, username: user.username, _id: user._id,}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10d",
    });
    return {accessToken,refreshToken}
}



// registers User
const registerUser = async (req, res) => {

    //getting data
    const { username, fullname, email, password } = req.body;

    try {

        //creating data instance
        const user = new User({ username, fullname, email, password })

        //generating and adding the tokens midway through
        const {accessToken,refreshToken} = generateAccessandRefreshTokens(user)
        user.refreshToken = refreshToken

        //saving the data
        await user.save();

        //sending response if user successfully created
        res

        //Adding cookies
        .cookie("accessToken", accessToken, {httpOnly: true,secure: process.env.NODE_ENV === 'production',maxAge: 60 * 60 * 1000})

        //status code with json response
        .status(201).json({
            message: "New user created",
            newUser : {
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                _id: user._id
            },
            tokens: {
                accessToken
            }
        })
    } catch (error) {
        //error checking
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "Username or email already exists." });
        }
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
}


const loginUser = async function (req,res) {
    const { username,email, password } = req.body;
    try {
        if (!username && !email) return res.status(400).json({
            message: "Username or email is required!"
        })
        const user = await User.findOne(
            {
                $or: [
                    {email:email},
                    {username:username}
                ]
            }
        )
        if(!user) return res.status(404).json({
            message: "No user found with such credentials"
        })
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if (!isPasswordCorrect) return res.status(401).json({
            message: "Invalid credentials"
        })
        const {accessToken, refreshToken} = generateAccessandRefreshTokens(user)
        const updateRefreshTokenInDB = await User.findOneAndUpdate({email : email}, {$set: {refreshToken}}, {new: true})
        if (!updateRefreshTokenInDB) return res.status(404).json({ message: "User not found" });
        res
        .cookie("accessToken",accessToken,{httpOnly: true,secure: process.env.NODE_ENV === 'production',maxAge: 60 * 60 * 1000})
        .status(200)
        .json({
            message: "User successfully logged in!",
            user : {
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                _id: user._id
            },
            tokens: {
                accessToken
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during login" });
    }
}

export { registerUser, loginUser }