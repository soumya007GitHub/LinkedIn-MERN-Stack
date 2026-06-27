import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ message: "No user found" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Failed to get current user details" });
    }
}