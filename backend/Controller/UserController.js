import User from "../Model/User.js";
import { generateToken } from "../utils/generateToken.js";

// POST /api/users
export const register = async (req, res, next) => {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields.");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({
        fname,
        lname,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        // TODO: error middleware from index.js
        res.status(400);
        throw new Error("Error creating new User");
    }
};

// POST /api/users/login
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.status(201).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
};
