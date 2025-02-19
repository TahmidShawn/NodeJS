import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";

// Register User

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ErrorHandler("Please provide valid info", 401);
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new ErrorHandler("User already exist", 403);
    }
    const newUser = await User.create({
        username,
        email,
        password,
    });
});
