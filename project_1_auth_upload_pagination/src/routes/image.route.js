const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");
const {
    uploadImage,
    fetchImageController,
    deleteImageController,
} = require("../controllers/image.controller");
const router = express.Router();

router.post(
    "/upload",
    authMiddleware,
    adminMiddleware,
    uploadMiddleware.single("image"),
    uploadImage
);

router.get("/get", authMiddleware, fetchImageController);
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;
