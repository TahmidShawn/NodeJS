const adminMiddleware = (req, res, next) => {
    if (req.userInfo.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "access denied! admin required",
        });
    }
    next();
};

module.exports = adminMiddleware;
