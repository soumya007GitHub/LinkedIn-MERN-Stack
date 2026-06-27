import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(400).json({ message: "No token present" });
        }
        const verification = await jwt.verify(token, process.env.TOKEN);
        if(!verification){
            return res.status(400).json({message: "The token is not valid"});
        }else{
            req.userId = verification.userId;
            next();
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth;