const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
    const { username, userId, role } = req.userInfo;
    res.status(201).json({
        success: true,
        message: "Welcome to the home Route",
        user: {
            userId,
            username,
            role,
        },
    });
});

module.exports = router;
