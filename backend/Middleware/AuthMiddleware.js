import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const authValidate = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // decode token id
            const decoded = jwt.verify(token, process.env.SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized. Token failed.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized. No token.");
    }
};

export default authValidate;
