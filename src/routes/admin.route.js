const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
    res.status(201).json({
        success: true,
        message: "Welcome to the Admin Route",
    });
});

module.exports = router;
