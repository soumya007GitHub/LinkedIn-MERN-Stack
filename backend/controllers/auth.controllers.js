import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import tokenGenerator from "../config/token.js";

const register = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;
        const userNameCheck = await User.findOne({ userName });
        if (userNameCheck) {
            return res.status(409).json({ message: "Username already exists, use some differrent username." });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(409).json({ message: "Email already exists, use some differrent email id." });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be 8 characters long." });
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            userName: userName.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPwd
        });
        const response = await newUser.save();
        if (response) {
            let token = tokenGenerator(newUser._id);
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENVIRONMENT === "production",
                sameSite: process.env.NODE_ENVIRONMENT === "development" ? "lax" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(201).json({ message: "Registration succesful" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Failed to register user ${e}` });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "No account found for this mail id." });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
            let token = tokenGenerator(user._id);
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENVIRONMENT === "production",
                sameSite: process.env.NODE_ENVIRONMENT === "development" ? 'lax' : 'strict',
                maxAge: 7 * 60 * 60 * 24 * 1000
            });
            return res.status(201).json({ message: "Login Succesful" });
        } else {
            return res.status(400).json({ message: "Password is wrong." });
        }
    } catch (e) {
        return res.status(500).json({ message: `Failed to login ${e}` });
    }
}

const logout = async (req, res) => {
    res.clearCookie("authToken");
    return res.status(200).json({ message: "Logged Out Succesfully" });
}

export { register, login, logout };