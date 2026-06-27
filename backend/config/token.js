import jwt from "jsonwebtoken";

const tokenGenerator = (userId) => {
    return jwt.sign(
        { userId },
        process.env.TOKEN,
        { expiresIn: "7d" }
    );
};

export default tokenGenerator;