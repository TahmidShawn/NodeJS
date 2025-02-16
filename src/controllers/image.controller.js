const Image = require("../models/image.model");
const { uploadToCloudinary } = require("../utils/cloudinaryHelpers");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required! Please upload an image",
            });
        }
        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // store url and publicId to db
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        });
        await newlyUploadedImage.save();
        // Delete file from local storage
        fs.unlinkSync(req.file.path);

        // response
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image: newlyUploadedImage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while uploading image",
        });
    }
};

const fetchImageController = async (req, res) => {
    try {
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        // fetch image
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if (images) {
            res.status(201).json({
                success: true,
                message: "Image Found",
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while uploading image",
        });
    }
};

const deleteImageController = async (req, res) => {
    try {
        const imageId = req.params.id;
        const userId = req.userInfo.userId;
        // console.log(imageId)

        const image = await Image.findById(imageId);
        // check image existence
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
        // check upload user
        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "user is not authorize to delete the image",
            });
        }
        // delete image from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // delete image from db
        await Image.findByIdAndDelete(imageId);
        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while uploading image",
        });
    }
};

module.exports = {
    uploadImage,
    fetchImageController,
    deleteImageController,
};
