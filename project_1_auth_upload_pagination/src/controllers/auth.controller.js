const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Logic here
const registerUser = async (req, res) => {
    try {
        // extract data from req.body
        const { username, email, password, role } = req.body;
        const isUserExist = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist",
            });
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // create a new user and save it to db
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashPassword,
            role: role || "user",
        });
        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            return res.status(201).json({
                success: true,
                message: "user created successfully",
            });
        } else {
            res.status(201).json({
                success: false,
                message: "unable to register user",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
};

// Login Logic here
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check user existence
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // matching password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // create token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );
        res.status(200).json({
            success: true,
            message: "logged in successful",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
};

// Change Password Logic here
const changePassword = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        // extract old and new password
        const { oldPassword, newPassword } = req.body;
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "New password must be different from the old password.",
            });
        }
        // check user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        // match old password
        const isPasswordMatched = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "old password not matched",
            });
        }
        // hash the new password here
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(newPassword, salt);

        // update user password
        user.password = newHashPassword;
        await user.save();
        res.status(201).json({
            success: true,
            message: "password change successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
};

module.exports = { registerUser, loginUser, changePassword };
